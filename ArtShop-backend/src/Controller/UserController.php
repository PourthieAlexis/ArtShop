<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    #[Route('/api/user', name: 'get_current_user', methods: ['GET'])]
    public function user(SerializerInterface $serializer): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            throw new BadRequestHttpException("L'utilisateur n'est pas trouvé");
        }
        $serializedUser = $serializer->serialize($user, 'json', ['groups' => ['user']]);

        return new JsonResponse($serializedUser, Response::HTTP_OK, [], true);
    }

    #[Route('/api/user/profil', name: 'edit_user_profile', methods: ['PATCH'])]
    public function editUser(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            throw new BadRequestHttpException("L'utilisateur n'est pas trouvé");
        }

        $requestData = json_decode($request->getContent(), true);

        $user->setName($requestData['name'] ?? $user->getName());
        $user->setArtistName($requestData['artistName'] ?? $user->getArtistName());
        $user->setPhone($requestData['phone'] ?? $user->getPhone());
        $user->setAddress($requestData['address'] ?? $user->getAddress());

        $errors = $validator->validate($user, null, ['edit_profil']);
        if (count($errors) > 0) {
            $errorMessages = [];

            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            throw new BadRequestHttpException(json_encode($errorMessages));
        }

        $entityManager->flush();

        return new JsonResponse(['message' => 'Le profil a été modifié'], Response::HTTP_OK);
    }

}
