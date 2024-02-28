<?php

namespace App\Controller;

use App\Repository\UsersRepository;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ObjectManager;
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

    #[Route('/api/profile-modify/{uuid}', name: 'app_Profile_Modify')]
    public function setProfile(string $uuid, UsersRepository $usersRepo, ObjectManager $manager) : JsonResponse
    {
        $user = $usersRepo->find($uuid);
        dd($user);
        $newName = $request->query->get('firstName')+" "+$request->query->get("lastName");
        $newAddress = $request->query->get('adresse');
        if ($newName != $data['name'] && $newName != "") {
            $user->setName($newName);
        }
        if ($newAddress != $data['address'] && $newAddress != ""){
            $user->setName($newAddress);
        }
        dd($user);
        $manager->persist($user);
        $manager->flush();
    }

}
