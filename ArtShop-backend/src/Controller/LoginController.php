<?php

namespace App\Controller;

use App\Entity\Carts;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

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
    public function register(Request $request, UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new Users();
        $user->setName($data['name']);
        $user->setEmail($data['email']);
        $user->setAddress($data['address']);
        $user->setPhone($data['phone']);
        $user->setArtistName($data['artistName']);
        $user->setPassword($data['password']);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];

            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            throw new BadRequestHttpException(json_encode($errorMessages));
        }

        $encodedPassword = $passwordEncoder->hashPassword($user, $user->getPassword());
        $user->setPassword($encodedPassword);

        $entityManager->persist($user);


        $cart = new Carts();
        $cart->setUsers($user);
        $entityManager->persist($cart);


        $entityManager->flush();

        return new JsonResponse(['message' => 'User registered successfully'], 201);
    }

}
