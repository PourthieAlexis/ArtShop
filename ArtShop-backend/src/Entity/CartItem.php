<?php

namespace App\Entity;

use App\Repository\CartItemRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CartItemRepository::class)]
class CartItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'cartItems')]
    private ?Carts $cart = null;

    #[ORM\ManyToOne(inversedBy: 'cartItems')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["cart_items"])]
    private ?Arts $art = null;

    #[ORM\Column]
    #[Groups(["cart_items"])]
    private ?int $quantity = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCart(): ?Carts
    {
        return $this->cart;
    }

    public function setCart(?Carts $cart): static
    {
        $this->cart = $cart;

        return $this;
    }

    public function getArt(): ?Arts
    {
        return $this->art;
    }

    public function setArt(?Arts $art): static
    {
        $this->art = $art;

        return $this;
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
}
