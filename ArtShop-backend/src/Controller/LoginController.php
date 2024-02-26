<?php

namespace App\Controller;

use App\Repository\UsersRepository;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class LoginController extends AbstractController
{

    /**
     * Register the user
     *
     * @param Request $request
     * @param UserPasswordHasherInterface $passwordEncoder
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     */
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new Users();
        $user->setName($data['name']);
        $user->setEmail($data['email']);
        $user->setAddress($data['address']);

        $encodedPassword = $passwordEncoder->hashPassword($user, $data['password']);
        $user->setPassword($encodedPassword);

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'User registered successfully'], 201);
    }

     /**
     * Retrieve the details of an artwork.
     *
     * @param string $uuid
     * @param ArtsRepository $artsRepo
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    #[Route('/api/profile/{uuid}', name: 'app_Profile', methods: ['GET'])]
    public function getProfile(string $uuid, UsersRepository $usersRepo, SerializerInterface $serializer, EntityManagerInterface $entityManager) : JsonResponse
    {
        $user = $usersRepo->find($uuid);

        if (!$user) {
            return $this->json(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);

        }

        $serializedUser = json_decode($serializer->serialize($user, 'json', ['groups' => 'user']), true);
        return new JsonResponse($serializedUser, 200, []);
    }
}
