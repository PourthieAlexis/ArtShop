<?php

namespace App\Entity;

use App\Repository\ArtsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ArtsRepository::class)]
class Arts
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(["user", "art", "user_arts", "cart_items"])]
    private ?Uuid $id;

    #[ORM\Column(length: 255)]
    #[Groups(["user", "art", "user_arts", "cart_items"])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(["art"])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(["user", "art", "user_arts", "cart_items"])]
    private ?float $price = null;

    #[ORM\Column]
    #[Groups(["art"])]
    private ?int $stock = null;

    #[ORM\Column(length: 255)]
    #[Groups(["user", "art", "user_arts", "cart_items"])]
    private ?string $image = null;

    #[ORM\ManyToOne(inversedBy: 'arts')]
    #[Groups(["art"])]
    private ?Users $users = null;

    #[ORM\ManyToOne(inversedBy: 'arts')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["art"])]
    private ?Categories $categories = null;

    #[ORM\OneToMany(mappedBy: 'arts', targetEntity: Comments::class, orphanRemoval: true)]
    #[Groups(["art"])]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'art', targetEntity: CartItem::class)]
    private Collection $cartItems;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->carts = new ArrayCollection();
        $this->cartItems = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

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

    public function getCategories(): ?Categories
    {
        return $this->categories;
    }

    public function setCategories(?Categories $categories): static
    {
        $this->categories = $categories;

        return $this;
    }

    /**
     * @return Collection<int, Comments>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comments $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setArts($this);
        }

        return $this;
    }

    public function removeComment(Comments $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getArts() === $this) {
                $comment->setArts(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, CartItem>
     */
    public function getCartItems(): Collection
    {
        return $this->cartItems;
    }

    public function addCartItem(CartItem $cartItem): static
    {
        if (!$this->cartItems->contains($cartItem)) {
            $this->cartItems->add($cartItem);
            $cartItem->setArt($this);
        }

        return $this;
    }

    public function removeCartItem(CartItem $cartItem): static
    {
        if ($this->cartItems->removeElement($cartItem)) {
            // set the owning side to null (unless already changed)
            if ($cartItem->getArt() === $this) {
                $cartItem->setArt(null);
            }
        }

        return $this;
    }
}
