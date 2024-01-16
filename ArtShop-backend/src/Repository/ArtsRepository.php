<?php

namespace App\Repository;

use App\Entity\Arts;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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
