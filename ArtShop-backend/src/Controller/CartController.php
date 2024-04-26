<?php

namespace App\Controller;

use App\Entity\CartItem;
use App\Entity\Carts;
use App\Repository\ArtsRepository;
use App\Repository\CartsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CartController extends AbstractController
{
    /**
     * Add an art to cart of the user
     *
     * @param Request $request
     * @param ArtsRepository $artsRepository
     * @param CartsRepository $cartsRepository
     * @param EntityManagerInterface $entityManager
     * @param Security $security
     * @return JsonResponse
     */
    #[Route('/api/cart', name: 'add_to_cart', methods: ['POST'])]
    public function addToCart(Request $request, ArtsRepository $artsRepository, CartsRepository $cartsRepository, EntityManagerInterface $entityManager, Security $security): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);

        $art = $artsRepository->find($requestData['art_id']);

        if (!$art) {
            return new JsonResponse(['error' => 'Art not found'], Response::HTTP_NOT_FOUND);
        }

        $user = $security->getUser();
        $cart = $cartsRepository->findOneBy(['users' => $user]);

        if (!$cart) {
            $cart = new Carts();
            $cart->setUsers($user);
            $entityManager->persist($cart);
        }

        $existingCartItem = $entityManager->getRepository(CartItem::class)->findOneBy(['cart' => $cart, 'art' => $art]);

        if ($existingCartItem) {
            $existingCartItem->setQuantity($existingCartItem->getQuantity() + $requestData['quantity']);
        } else {
            $cartItem = new CartItem();
            $cartItem->setCart($cart);
            $cartItem->setArt($art);
            $cartItem->setQuantity($requestData['quantity']);
            $entityManager->persist($cartItem);
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Art added to cart'], Response::HTTP_CREATED);
    }

    /**
     * Retrieve the cart of the current user
     *
     * @param CartsRepository $cartsRepository
     * @param SerializerInterface $serializer
     * @param Security $security
     * @return JsonResponse
     */
    #[Route('/api/cart', name: 'show_cart', methods: ['GET'])]
    public function showCart(CartsRepository $cartsRepository, SerializerInterface $serializer, Security $security): JsonResponse
    {
        $user = $security->getUser();

        $cart = $cartsRepository->findOneBy(['users' => $user]);

        if (!$cart) {
            return new JsonResponse(['message' => 'Cart is empty'], Response::HTTP_OK);
        }

        $cartItems = $cart->getCartItems();

        $cartData = $serializer->serialize($cartItems, 'json', ['groups' => ['cart_items']]);

        return new JsonResponse($cartData, Response::HTTP_OK, [], true);
    }
}
