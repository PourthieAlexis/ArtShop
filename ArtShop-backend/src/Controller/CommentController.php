<?php

namespace App\Controller;

use App\Entity\Comments;
use App\Repository\ArtsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CommentController extends AbstractController
{

    /**
     * Add a comment and return the added comment
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param ArtsRepository $artsRepo
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    #[Route('/api/comment', name: 'add-comment', methods: 'POST')]
    public function addComment(Request $request, EntityManagerInterface $entityManager, ArtsRepository $artRepo, SerializerInterface $serializer, ValidatorInterface $validator): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'You need to be authenticated'], 400);
        }

        $requestData = json_decode($request->getContent(), true);
        $comment = new Comments();
        $comment->setMessage($requestData['message'] ?? '');
        $comment->setUsers($user);

        $art = $artRepo->find($requestData['art_id']);
        if (!$art) {
            return $this->json(['error' => 'Art not found'], 400);
        }
        $comment->setArts($art);

        $errors = $validator->validate($comment);
        if (count($errors) > 0) {
            return $this->json(['error' => 'Invalid comment data'], 400);
        }

        $entityManager->persist($comment);
        $entityManager->flush();

        $serializedComment = $serializer->serialize($comment, 'json', ['groups' => ['comment']]);
        return new JsonResponse($serializedComment, 201, [], true);
    }
}
