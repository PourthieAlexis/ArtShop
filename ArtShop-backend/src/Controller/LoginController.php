<?php

namespace App\Controller;

use App\Entity\Carts;
use App\Entity\Users;
use App\Repository\UsersRepository;
use App\Service\EmailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class LoginController extends AbstractController
{
    private $mail;

    public function __construct(
        EmailService $mail
    ) {
        $this->mail = $mail;
    }

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

        $randomString = bin2hex(random_bytes(16));
        $timestamp = time();
        $token = $randomString . $timestamp;

        $user = new Users();
        $user->setName($data['name']);
        $user->setEmail($data['email']);
        $user->setAddress($data['address']);
        $user->setPhone($data['phone']);
        $user->setArtistName($data['artistName']);
        $user->setPassword($data['password']);
        $user->setToken($token);

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

        $this->mail->sendWithTemplate(
            'alexispourthie@gmail.com',
            $user->getEmail(),
            'Veuillez vérifier votre adresse e-mail',
            'email/signup.html.twig',
            [
                'name' => $user->getName(),
                'userEmail' => $user->getEmail(),
                'token' => $user->getToken(),
            ]
        );

        return new JsonResponse(['message' => 'User registered successfully'], Response::HTTP_CREATED);
    }

    #[Route('/api/verifyEmail', name: 'verify_email', methods: ['POST'])]
    public function verifyEmail(Request $request, EntityManagerInterface $entityManager, UsersRepository $usersRepo): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $usersRepo->findOneBy(['token' => $data['token']]);
        if (!$user) {
            return new JsonResponse(['message' => 'Unable to verify your email address.'], Response::HTTP_NOT_FOUND);
        }

        $user->setIsActive(true);
        $user->setToken(null);
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Your email address has been successfully verified.']);
    }


}
