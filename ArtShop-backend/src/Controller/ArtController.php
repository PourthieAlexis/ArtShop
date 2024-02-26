<?php

namespace App\Controller;

use App\Repository\ArtsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ArtController extends AbstractController
{
    #[Route('/art', name: 'app_art')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ArtController.php',
        ]);
    }

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
            return $this->json(['error' => 'Art not found'], JsonResponse::HTTP_NOT_FOUND);
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

        return new JsonResponse($responseData, JsonResponse::HTTP_OK);
    }

}
