<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UsersRepository;
class ProfilController extends AbstractController
{
    #[Route('/api/profil', name: 'app_profil')]
    public function index(UsersRepository $UsersRepo): JsonResponse
    {
        $users = $UsersRepo->findAll();
        $encodedUsers = [];
        foreach ($users as $user) 
        {
            $encodedUsers[] = [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'adresse' => $user->getAddress(),
                'arts'=> $user->getArts(),

                // Ajoutez ici d'autres propriétés que vous souhaitez inclure
            ];
        }

        return new JsonResponse($encodedUsers, 200);
    }
}
