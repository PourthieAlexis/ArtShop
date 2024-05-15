<?php
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Repository\ArtsRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Knp\Component\Pager\Pagination\PaginationInterface;

class ArtControllerTest extends WebTestCase
{
    public function testSearchArt()
    {

        $client = static::createClient();
        // Appeler l'API
        $client->request('GET', '/api/artworks', ['searchTerm' => '']);
        $response = $client->getResponse();

        // Vérifier que la réponse est bien une réponse JSON
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $this->assertJson($response->getContent());

        // Vérifier le contenu de la réponse
        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('art', $responseData);
        $this->assertArrayHasKey('pagination', $responseData);
        $this->assertCount(10, $responseData['art']);
    }
}
