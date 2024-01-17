<?php

namespace App\DataFixtures;

use App\Entity\Arts;
use App\Entity\Categories;
use App\Entity\Comments;
use App\Entity\Users;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $hashPassword;

    public function __construct(UserPasswordHasherInterface $hashPassword)
    {
        $this->hashPassword = $hashPassword;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        // Création d'utilisateurs
        $users = [];
        for ($i = 0; $i < 5; $i++) {
            $user = new Users();
            $user->setName($faker->userName);
            $user->setEmail($faker->email);
            $user->setAddress($faker->address);
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
        $artworks = [];
        foreach ($categories as $category) {
            for ($i = 0; $i < 2; $i++) {
                $artwork = new Arts();
                $artwork->setTitle($faker->sentence(3));
                $artwork->setDescription($faker->paragraph(3));
                $artwork->setPrice($faker->randomNumber(5));
                $artwork->setStock($faker->numberBetween(1, 20));
                $artwork->setImage($faker->imageUrl(400, 300, 'artwork'));
                $artwork->setUsers($faker->randomElement($users));
                $artwork->setCategories($category);
                $manager->persist($artwork);
                $artworks[] = $artwork;
            }
        }

        // Création de commentaires
        foreach ($artworks as $artwork) {
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
