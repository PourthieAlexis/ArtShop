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

class UserController extends AbstractController
{
     /**
     * Retrieve everything associated to the selected user.
     *
     * @param string $uuid
     * @param UsersRepository $UsersRepo
     * @param SerializerInterface $serializer
     * @param EntityManagerInterface $entityManager
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
     /**
     * Modify the infos of the selected user.
     *
     * @param string $uuid
     * @param UsersRepository $UsersRepo
     * @param EntityManagerInterface $Manager
     * @param Request $request
     * @return JsonResponse
     */
    #[Route('/api/profile-modify/{uuid}', name: 'app_Profile_Modify')]
    public function setProfile(string $uuid,UsersRepository $usersRepo, EntityManagerInterface $manager, Request $request) : JsonResponse
    {
        $user = $usersRepo->find($uuid);
        $newName = $request->query->get('firstName');
        $newAddress = $request->query->get('adresse');
        if ($newName != $user->getName() && $newName != "") {
            $user->setName($newName);
        }
        if ($newAddress != $user->getAddress() && $newAddress != ""){
            $user->setAddress($newAddress);
        }
        $manager->persist($user);
        $manager->flush();
        
        return new JsonResponse(['message' => 'Success'], 200, []);
    }

}
