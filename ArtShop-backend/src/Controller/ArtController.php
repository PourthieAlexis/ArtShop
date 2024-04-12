<?php

namespace App\Controller;

use App\Repository\ArtsRepository;
use App\Repository\UsersRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use App\Util\Utils;

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
            throw new BadRequestHttpException("UUID n'est pas valide");
        }
        $art = $artsRepo->findOneBy(['id' => $uuid]);

        if (!$art) {
            throw new NotFoundHttpException("Aucune œuvre d'art trouvée");
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
            throw new BadRequestHttpException("L'utilisateur n'est pas connecté");
        }
        $art = $artsRepo->findBy(['users' => $user]);

        $serializedArt = $serializer->serialize($art, 'json', ['groups' => ['art']]);

        return new JsonResponse($serializedArt, Response::HTTP_OK, [], true);
    }


    #[Route('/api/get-art', name: 'api_search_art', methods: ['GET'])]
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


    #[Route('/api/user/{uuid}/artworks', name: 'api_user_artworks_by_uuid', methods: ['GET'])]
    public function getUserArtworksByUuid(string $uuid, ArtsRepository $artsRepo, SerializerInterface $serializer, Security $security, UsersRepository $userRepo): JsonResponse
    {
        if (!Utils::isUUID($uuid)) {
            throw new BadRequestHttpException("UUID n'est pas valide");
        }
        $user = $userRepo->find($uuid);

        if (!$user) {
            throw new BadRequestHttpException("L'utilisateur n'est pas trouvé");
        }
        $art = $artsRepo->findBy(['users' => $user]);

        $serializedArt = $serializer->serialize($art, 'json', ['groups' => ['art']]);

        return new JsonResponse($serializedArt, Response::HTTP_OK, [], true);
    }


}


