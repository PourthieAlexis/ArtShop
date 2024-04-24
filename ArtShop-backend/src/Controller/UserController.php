<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
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

    #[Route('/api/user/profil/picture', name: 'change_profile_picture', methods: ['POST'])]
    public function changeProfilePicture(Request $request, EntityManagerInterface $entityManager, Filesystem $filesystem, SluggerInterface $slugger): Response
    {
        $user = $this->getUser();
        if (!$user) {
            throw new BadRequestHttpException("L'utilisateur n'est pas trouvé");
        }

        $uploadedFile = $request->files->get('picture');
        if (!$uploadedFile) {
            return $this->json(['error' => 'No picture uploaded'], Response::HTTP_BAD_REQUEST);
        }

        $destination = $this->getParameter('profile_picture_directory');
        $newFilename = $slugger->slug(uniqid()) . '.' . $uploadedFile->guessExtension();

        try {
            $uploadedFile->move($destination, $newFilename);

            $oldProfilePicture = $user->getProfilePicture();
            if ($oldProfilePicture && $filesystem->exists($destination . '/' . $oldProfilePicture)) {
                $filesystem->remove($destination . '/' . $oldProfilePicture);
            }

            $user->setProfilePicture($newFilename);
            $entityManager->flush();

            return $this->json(['message' => 'Profile picture updated successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json(['error' => 'An error occurred while updating profile picture'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
