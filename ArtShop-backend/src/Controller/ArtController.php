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

    #[Route('/api/detail-art/{uuid}', name: 'api_art_details')]
    public function detailsArt(string $uuid, ArtsRepository $artsRepo, SerializerInterface $serializer): JsonResponse
    {
        $art = $artsRepo->find($uuid);

        if (!$art) {
            return $this->json(['error' => 'Art not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $serializedArt = $serializer->serialize($art, 'json', ['groups' => 'art']);

        return new JsonResponse($serializedArt, 200, [], true);
    }

}
