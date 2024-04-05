<?php

namespace App\Controller;

use App\Repository\ArtsRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;

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
        $art = $artsRepo->findOneBy(['id' => $uuid]);

        if (!$art) {
            return $this->json(['error' => 'Art not found'], Response::HTTP_NOT_FOUND);
        }

        $serializedArt = $serializer->serialize($art, 'json', ['groups' => ['art']]);

        $userArts = $art->getUsers()->getArts()->toArray();
        $userArtsFiltered = array_filter($userArts, fn($userArt) => $userArt->getId() !== $art->getId());
        $userArtsArray = array_values($userArtsFiltered);

        $serializedUserArts = $serializer->serialize($userArtsArray, 'json', ['groups' => ['user_arts']]);

        $responseData = [
            'art' => json_decode($serializedArt, true),
            'user_arts' => json_decode($serializedUserArts, true)
        ];

        return new JsonResponse($responseData, Response::HTTP_OK);
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

}


