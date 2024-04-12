<?php

namespace App\Repository;

use App\Entity\Arts;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Arts>
 *
 * @method Arts|null find($id, $lockMode = null, $lockVersion = null)
 * @method Arts|null findOneBy(array $criteria, array $orderBy = null)
 * @method Arts[]    findAll()
 * @method Arts[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArtsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Arts::class);
    }


    public function findBySearchTerm(string $searchTerm)
    {
        $queryBuilder = $this->createQueryBuilder('a')
            ->leftJoin('a.categories', 'c', Join::WITH, 'c.name LIKE :searchTerm')
            ->orWhere('a.title LIKE :searchTerm')
            ->setParameter('searchTerm', '%' . $searchTerm . '%')
            ->getQuery();

        return $queryBuilder->getResult();
    }

    //    /**
//     * @return Arts[] Returns an array of Arts objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

    //    public function findOneBySomeField($value): ?Arts
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
