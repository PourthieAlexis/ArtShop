<?php

namespace App\Controller;

use App\Entity\Arts;
use App\Repository\ArtsRepository;
use App\Repository\CategoriesRepository;
use App\Repository\UsersRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use App\Util\Utils;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ArtController extends AbstractController
{

    /**
     * Retrieve the details of an artwork.
     *
     * @param string $uuid
     * @param ArtsRepository $artsRepo
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    #[Route('/api/details-art/{uuid}', name: 'api_art_details', methods: ['GET'])]
    public function detailsArt(string $uuid, ArtsRepository $artsRepo, SerializerInterface $serializer): JsonResponse
    {
        if (!Utils::isUUID($uuid)) {
            throw new BadRequestHttpException("UUID is not valid");
        }
        $art = $artsRepo->findOneBy(['id' => $uuid]);

        if (!$art) {
            throw new NotFoundHttpException("No artwork found");
        }

        $serializedArt = $serializer->serialize($art, 'json', ['groups' => ['art']]);

        return new JsonResponse($serializedArt, Response::HTTP_OK, [], true);
    }

    /**
     * Retrieves artworks of the current user
     *
     * @param ArtsRepository $artsRepo
     * @param SerializerInterface $serializer
     * @param Security $security
     * @return JsonResponse
     */
    #[Route('/api/user/artworks', name: 'api_user_artworks', methods: ['GET'])]
    public function getUserArtworks(ArtsRepository $artsRepo, SerializerInterface $serializer, Security $security): JsonResponse
    {

        $user = $security->getUser();
        if (!$user) {
            throw new BadRequestHttpException("User is not logged in");
        }
        $art = $artsRepo->findBy(['users' => $user]);

        $serializedArt = $serializer->serialize($art, 'json', ['groups' => ['art']]);

        return new JsonResponse($serializedArt, Response::HTTP_OK, [], true);
    }

    /**
     * Add Artworks to User
     *
     * @param ArtsRepository $artsRepo
     * @param Security $security
     * @param EntityManagerInterface $entityManager
     * @param ValidatorInterface $validator
     * @param Request $request
     * @param CategoriesRepository $categoriesRepo
     * @return JsonResponse
     */
    #[Route('/api/artworks', name: 'api_add_artworks', methods: ['POST'])]

    public function addArtWorks(
        ArtsRepository $artsRepo,
        Security $security,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        Request $request,
        CategoriesRepository $categoriesRepo,
        SluggerInterface $slugger
    ): JsonResponse {

        $user = $security->getUser();
        if (!$user) {
            throw new BadRequestHttpException("User is not logged in");
        }
        $category = $categoriesRepo->findOneBy(['name' => $request->request->get('category')]);

        $art = new Arts();
        $art->setTitle($request->request->get('title'));
        $art->setCategories($category);
        $art->setDescription($request->request->get('description'));
        $art->setPrice($request->request->get('price'));
        $art->setStock($request->request->get('stock'));
        $art->setUsers($user);

        $imageFile = $request->files->get('image');
        if ($imageFile) {
            $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();

            try {
                $imageFile->move(
                    $this->getParameter('images_directory'),
                    $newFilename
                );
            } catch (FileException $e) {
                throw new BadRequestHttpException('An error occurred while saving the image');
            }

            $art->setImage($newFilename);
        }

        $errors = $validator->validate($art);
        if (count($errors) > 0) {
            $errorMessages = [];

            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            throw new BadRequestHttpException(json_encode($errorMessages));
        }

        $entityManager->persist($art);
        $entityManager->flush();


        return new JsonResponse(['message' => 'Art registered successfully'], Response::HTTP_CREATED);
    }

    /**
     * Get artworks
     *
     * @param Request $request
     * @param ArtsRepository $artRepository
     * @param PaginatorInterface $paginator
     * @param NormalizerInterface $normalizer
     * @return JsonResponse
     */
    #[Route('/api/artworks', name: 'api_search_art', methods: ['GET'])]
    public function searchArt(Request $request, ArtsRepository $artRepository, PaginatorInterface $paginator, NormalizerInterface $normalizer): JsonResponse
    {
        $searchTerm = $request->query->get('searchTerm');
        $page = $request->query->getInt('page', 1);
        $limit = 10;

        $pagination = $paginator->paginate(
            $artRepository->findBySearchTerm($searchTerm),
            $page,
            $limit
        );
        $totalItems = $pagination->getTotalItemCount();
        $artData = $normalizer->normalize($pagination->getItems(), null, ['groups' => 'art']);

        $response = [
            'art' => $artData,
            'pagination' => [
                'totalItems' => $totalItems,
                'itemsPerPage' => $pagination->count(),
                'currentPage' => $page,
                'nextPage' => $page < ceil($totalItems / $limit) ? $page + 1 : null,
                'totalPages' => ceil($totalItems / $limit)
            ]
        ];

        if ($totalItems === 0) {
            $response['art'] = 'No artwork found.';
        }

        return new JsonResponse($response, Response::HTTP_OK);
    }


    /**
     * Get user artworks by uuid
     *
     * @param string $uuid
     * @param ArtsRepository $artsRepo
     * @param SerializerInterface $serializer
     * @param Security $security
     * @param UsersRepository $userRepo
     * @return JsonResponse
     */
    #[Route('/api/user/{uuid}/artworks', name: 'api_user_artworks_by_uuid', methods: ['GET'])]
    public function getUserArtworksByUuid(string $uuid, ArtsRepository $artsRepo, SerializerInterface $serializer, Security $security, UsersRepository $userRepo): JsonResponse
    {
        if (!Utils::isUUID($uuid)) {
            throw new BadRequestHttpException("UUID is not valid");
        }
        $user = $userRepo->find($uuid);

        if (!$user) {
            throw new BadRequestHttpException("User not found");
        }
        $art = $artsRepo->findBy(['users' => $user]);

        $serializedArt = $serializer->serialize($art, 'json', ['groups' => ['art']]);

        return new JsonResponse($serializedArt, Response::HTTP_OK, [], true);
    }


    /**
     * Delete artworks by uuid
     *
     * @param string $uuid
     * @param ArtsRepository $artsRepo
     * @param SerializerInterface $serializer
     * @param Security $security
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     */
    #[Route('/api/artworks/{uuid}', name: 'api_delete_artworks_by_uuid', methods: ['DELETE'])]
    public function deleteArtByUUID(string $uuid, ArtsRepository $artsRepo, SerializerInterface $serializer, Security $security, EntityManagerInterface $entityManager): JsonResponse
    {
        if (!Utils::isUUID($uuid)) {
            throw new BadRequestHttpException("UUID is not valid");
        }

        $user = $this->getUser();

        if (!$user) {
            throw new BadRequestHttpException("User not found");
        }

        $artwork = $artsRepo->findOneBy(['id' => $uuid]);

        if (!$artwork || $artwork->getUsers() !== $user) {
            throw new BadRequestHttpException("Artwork does not exist or does not belong to this user");
        }

        $entityManager->remove($artwork);
        $entityManager->flush();

        return new JsonResponse(['message' => "Artwork has been deleted successfully"], Response::HTTP_OK);
    }


}


