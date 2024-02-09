<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ArtsRepository;

class ArtController extends AbstractController
{
    #[Route('/api/art', name: 'app_art')]
    public function index(ArtsRepository $artRepo): JsonResponse
    {
        $arts = $artRepo->findAll();
        
        $encodedArts = [];
        foreach ($arts as $art) 
        {
            $encodedArts[] = [
                'id' => $art->getId(),
                'users_id' => $art->getUsers()->getId(),
                'title' => $art->getTitle(),
                'categories_id'=> $art->getCategories()->getId(),
                'description'=> $art->getDescription(),
                'price'	=> $art->getPrice(),
                'stock'	=> $art->getStock(),
                'image'=> $art->getImage(),
                // Ajoutez ici d'autres propriétés que vous souhaitez inclure
            ];
        }

        return new JsonResponse($encodedArts, 200);
    }
}