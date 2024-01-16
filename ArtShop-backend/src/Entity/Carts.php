<?php

namespace App\Entity;

use App\Repository\CartsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartsRepository::class)]
class Carts
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $quantity = null;

    #[ORM\ManyToOne(inversedBy: 'carts')]
    private ?Users $users = null;

    #[ORM\ManyToMany(targetEntity: Arts::class, mappedBy: 'carts')]
    private Collection $arts;

    #[ORM\OneToMany(mappedBy: 'carts', targetEntity: Orders::class)]
    private Collection $orders;

    public function __construct()
    {
        $this->arts = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getUsers(): ?Users
    {
        return $this->users;
    }

    public function setUsers(?Users $users): static
    {
        $this->users = $users;

        return $this;
    }

    /**
     * @return Collection<int, Arts>
     */
    public function getArts(): Collection
    {
        return $this->arts;
    }

    public function addArt(Arts $art): static
    {
        if (!$this->arts->contains($art)) {
            $this->arts->add($art);
            $art->addCart($this);
        }

        return $this;
    }

    public function removeArt(Arts $art): static
    {
        if ($this->arts->removeElement($art)) {
            $art->removeCart($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Orders>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Orders $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setCarts($this);
        }

        return $this;
    }

    public function removeOrder(Orders $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getCarts() === $this) {
                $order->setCarts(null);
            }
        }

        return $this;
    }
}
