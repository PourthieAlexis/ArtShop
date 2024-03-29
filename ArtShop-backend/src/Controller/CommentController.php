<?php

namespace App\Controller;

use App\Entity\Comments;
use App\Repository\ArtsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CommentController extends AbstractController
{

    /**
     * Add a comment a return the comment added
     *
     * @param Request $request
     * @param Security $security
     * @param EntityManagerInterface $entityManager
     * @param ArtsRepository $artsRepo
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    #[Route('/api/add-comment', name: 'add-comment', methods: 'POST')]
    public function addComment(Request $request, Security $security, EntityManagerInterface $entityManager, ArtsRepository $artRepo, SerializerInterface $serializer, ValidatorInterface $validator): JsonResponse
    {
        $user = $security->getUser();
        if (!$user) {
            return $this->json(['error' => 'You need to be authenticated'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $requestData = json_decode($request->getContent(), true);
        $comment = new Comments();
        $comment->setMessage($requestData['message'] ?? '');
        $comment->setUsers($user);

        $art = $artRepo->find($requestData['art_id']);
        if (!$art) {
            return $this->json(['error' => 'Art not found'], JsonResponse::HTTP_BAD_REQUEST);
        }
        $comment->setArts($art);

        $errors = $validator->validate($comment);
        if (count($errors) > 0) {
            return $this->json(['error' => 'Invalid comment data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($comment);
        $entityManager->flush();

        $serializedComment = $serializer->serialize($comment, 'json', ['groups' => ['comment']]);
        return new JsonResponse($serializedComment, JsonResponse::HTTP_CREATED, [], true);
    }
}
