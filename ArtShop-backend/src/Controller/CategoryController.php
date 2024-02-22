<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CategoriesRepository;

class CategoryController extends AbstractController
{
    #[Route('/api/category', name: 'app_category')]
    public function index(CategoriesRepository $categoryRepo): JsonResponse
    {
    $categories = $categoryRepo->findAll();
    
    $encodedCategories = [];
    foreach ($categories as $category) 
    {
        $encodedCategories[] = [
            'id' => $category->getId(),
            'name' => $category->getName(),
            // Ajoutez ici d'autres propriétés que vous souhaitez inclure
        ];
    }
    return new JsonResponse($encodedCategories, 200);
    }
}

