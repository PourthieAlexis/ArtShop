<?php

namespace App\DataFixtures;

use App\Entity\Arts;
use App\Entity\Carts;
use App\Entity\Categories;
use App\Entity\Comments;
use App\Entity\Users;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use GuzzleHttp\Client;
use Faker\Provider\Image;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class AppFixtures extends Fixture
{
    private $hashPassword;

    public function __construct(UserPasswordHasherInterface $hashPassword, SluggerInterface $slugger, ParameterBagInterface $params)
    {
        $this->hashPassword = $hashPassword;
        $this->slugger = $slugger;
        $this->params = $params;
    }

    public function load(ObjectManager $manager): void
    {
        $filesystem = new Filesystem();
        $uploadsImageDir = $this->params->get('kernel.project_dir') . '/public/uploads/images/';
        $uploadsProfilePictureDir = $this->params->get('kernel.project_dir') . '/public/uploads/profile_pictures/';
        $filesystem->remove([$uploadsImageDir, $uploadsProfilePictureDir]);
        $filesystem->mkdir([$uploadsImageDir, $uploadsProfilePictureDir]);

        $faker = Factory::create('fr_FR');

        $faker->addProvider(new Image($faker));

        $client = new Client();
        $response = $client->request('GET', 'https://api.artic.edu/api/v1/artworks?fields=id,title,image_id');
        $data = json_decode($response->getBody()->getContents(), true);

        $users = [];
        for ($i = 0; $i < 5; $i++) {
            $user = new Users();
            $userData = $this->getRandomUserData();

            $user->setName($userData['name']['first'] . ' ' . $userData['name']['last']);
            $user->setArtistName($userData['login']['username']);
            $user->setPhone($userData['phone']);
            $user->setEmail($userData['email']);
            $address = $userData['location']['street']['number'] . ', ' . $userData['location']['city'] . ', ' . $userData['location']['state'] . ', ' . $userData['location']['postcode'];
            $user->setAddress($address);
            $user->setPassword($this->hashPassword->hashPassword($user, '123456789aA!'));
            $imageName = $this->downloadAndSaveImage($userData['picture']['large'], $userData['login']['uuid'], 'profile_pictures');
            $user->setProfilePicture($imageName);
            $manager->persist($user);
            $users[] = $user;
        }

        $categories = [];
        foreach (['Peinture', 'Sculpture', 'Photographie', 'Art Contemporain', 'Art Numérique'] as $categoryName) {
            $category = new Categories();
            $category->setName($categoryName);
            $manager->persist($category);
            $categories[] = $category;
        }

        $artworks = [];
        foreach ($data['data'] as $artworkData) {
            $artwork = new Arts();
            $artwork->setTitle($artworkData['title']);
            $artwork->setDescription($faker->paragraph(3));
            $artwork->setPrice($faker->randomNumber(5));
            $artwork->setStock($faker->numberBetween(1, 20));

            $baseUrl = 'https://www.artic.edu/iiif/2/';
            $imageUrl = $baseUrl . $artworkData['image_id'] . '/full/400,/0/default.jpg';
            $imageName = $this->downloadAndSaveImage($imageUrl, $artworkData['image_id'], 'images');
            $artwork->setImage($imageName);

            $artwork->setUsers($faker->randomElement($users));
            $artwork->setCategories($faker->randomElement($categories));
            $manager->persist($artwork);
            $artworks[] = $artwork;
        }

        foreach ($artworks as $artwork) {
            for ($j = 0; $j < 3; $j++) {
                $comment = new Comments();
                $comment->setMessage($faker->sentence(4));
                $comment->setUsers($faker->randomElement($users));
                $comment->setArts($artwork);
                $manager->persist($comment);
            }
        }

        foreach ($users as $user) {
            $cart = new Carts();
            $cart->setUsers($user);
            $manager->persist($cart);
        }

        $manager->flush();
    }

    private function getRandomUserData(): array
    {
        $url = 'https://randomuser.me/api/?nat=fr';
        $response = file_get_contents($url);
        $data = json_decode($response, true);
        return $data['results'][0];
    }
    private function downloadAndSaveImage(string $imageUrl, string $imageId, string $repoUpload): string
    {

        $imageContent = file_get_contents($imageUrl);

        $imageName = $this->slugger->slug($imageId . '-' . uniqid()) . '.jpg';

        file_put_contents('public/uploads/' . $repoUpload . '/' . $imageName, $imageContent);

        return $imageName;
    }
}
