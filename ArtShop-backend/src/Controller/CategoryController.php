<?php

namespace App\Controller;

use App\Repository\CategoriesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CategoryController extends AbstractController
{
    /**
     * Get all the categories
     *
     * @param CategoriesRepository $categoriesRepo
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    #[Route('/api/category', name: 'app_category', methods: ['GET'])]
    public function getCategory(CategoriesRepository $categoriesRepo, SerializerInterface $serializer): JsonResponse
    {

        $categories = $categoriesRepo->findAll();

        if (!$categories) {
            throw new NotFoundHttpException('No categories found');
        }

        $serializedCategories = $serializer->serialize($categories, 'json', ['groups' => ['category']]);

        return new JsonResponse($serializedCategories, Response::HTTP_OK, [], true);
    }
}
