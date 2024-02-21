<?php

namespace App\DataFixtures;

use App\Entity\Arts;
use App\Entity\Categories;
use App\Entity\Comments;
use App\Entity\Users;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use GuzzleHttp\Client;

class AppFixtures extends Fixture
{
    private $hashPassword;

    public function __construct(UserPasswordHasherInterface $hashPassword)
    {
        $this->hashPassword = $hashPassword;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $client = new Client();
        $response = $client->request('GET', 'https://api.artic.edu/api/v1/artworks?fields=id,title,image_id');
        $data = json_decode($response->getBody()->getContents(), true);

        // Création d'utilisateurs
        $users = [];
        for ($i = 0; $i < 5; $i++) {
            $user = new Users();
            $user->setName($faker->userName);
            $user->setEmail($faker->email);
            $user->setAddress("adresse 1");
            $user->setPassword($this->hashPassword->hashPassword($user, '12345'));
            $manager->persist($user);
            $users[] = $user;
        }

        // Création de catégories
        $categories = [];
        foreach (['Peinture', 'Sculpture', 'Photographie', 'Art Contemporain', 'Art Numérique'] as $categoryName) {
            $category = new Categories();
            $category->setName($categoryName);
            $manager->persist($category);
            $categories[] = $category;
        }

        // Création d'œuvres d'art
        foreach ($data['data'] as $artworkData) {
            $artwork = new Arts();
            $artwork->setTitle('title');
            $artwork->setDescription($faker->paragraph(3));
            $artwork->setPrice($faker->randomNumber(5));
            $artwork->setStock($faker->numberBetween(1, 20));
            $artwork->setImage('https://www.artic.edu/iiif/2/' . $artworkData['image_id'] . '/full/843,/0/default.jpg');
            $artwork->setUsers($faker->randomElement($users));
            $artwork->setCategories($faker->randomElement($categories));
            $manager->persist($artwork);
        }

        // Création de commentaires
        foreach ($manager->getRepository(Arts::class)->findAll() as $artwork) {
            for ($j = 0; $j < 3; $j++) {
                $comment = new Comments();
                $comment->setMessage($faker->sentence(4));
                $comment->setUsers($faker->randomElement($users));
                $comment->setArts($artwork);
                $manager->persist($comment);
            }
        }

        $manager->flush();
    }
}
