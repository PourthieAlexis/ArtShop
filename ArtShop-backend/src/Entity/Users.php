<?php

namespace App\Entity;

use App\Repository\UsersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: UsersRepository::class)]
#[UniqueEntity('email', "L'email est déjà utilisé")]
class Users implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(["user", "art"])]
    private ?Uuid $id;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank(message: "L'email est obligatoire")]
    #[Assert\Regex(
        pattern: "/^[\w\-]+@([\w\-]+\.)+[\w\-]{2,4}$/",
        message: "L'email n'est pas valide",
    )]
    #[Groups(["user", "art"])]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = ['ROLE_USER'];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Assert\NotBlank(message: "Le mot de passe est obligatoire")]
    #[Assert\Regex(
        pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/',
        message: 'Doit contenir au moins une lettre minuscule, majuscule, un chiffre, un caractère spécial et une longueur de 12 caractères',
    )]
    private ?string $password = null;
    #[ORM\Column(length: 255)]
    #[Groups(["user", "art"])]
    private ?string $address = null;

    #[ORM\Column(length: 50)]
    #[Groups(["user", "art", "comment"])]
    #[Assert\NotBlank(message: "Le nom est obligatoire", groups: ['edit_profil'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'users', targetEntity: Arts::class)]
    #[Groups(["user", "user_arts"])]
    private Collection $arts;

    #[ORM\OneToMany(mappedBy: 'users', targetEntity: Comments::class)]
    private Collection $comments;

    #[ORM\OneToMany(mappedBy: 'users', targetEntity: Carts::class)]
    private Collection $carts;

    #[ORM\OneToMany(mappedBy: 'users', targetEntity: Messages::class)]
    private Collection $messages;

    #[ORM\OneToMany(mappedBy: 'users', targetEntity: Orders::class)]
    private Collection $orders;

    #[ORM\Column]
    private ?bool $isActive = false;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["user", "art", "comment"])]
    private ?string $profilePicture = null;

    #[ORM\Column(length: 50)]
    #[Groups(["user"])]
    #[Assert\NotBlank(message: "Vous devez avoir un nom d'artiste", groups: ['edit_profil'])]
    private ?string $artistName = "";

    #[ORM\Column(length: 255)]
    #[Groups(["user"])]
    #[Assert\NotBlank(message: "Le numéro de téléphone est obligatoire", groups: ['edit_profil'])]
    private ?string $phone = null;

    public function __construct()
    {
        $this->arts = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->carts = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

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
            $art->setUsers($this);
        }

        return $this;
    }

    public function removeArt(Arts $art): static
    {
        if ($this->arts->removeElement($art)) {
            // set the owning side to null (unless already changed)
            if ($art->getUsers() === $this) {
                $art->setUsers(null);
            }
        }

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
            $comment->setUsers($this);
        }

        return $this;
    }

    public function removeComment(Comments $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUsers() === $this) {
                $comment->setUsers(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Carts>
     */
    public function getCarts(): Collection
    {
        return $this->carts;
    }

    public function addCart(Carts $cart): static
    {
        if (!$this->carts->contains($cart)) {
            $this->carts->add($cart);
            $cart->setUsers($this);
        }

        return $this;
    }

    public function removeCart(Carts $cart): static
    {
        if ($this->carts->removeElement($cart)) {
            // set the owning side to null (unless already changed)
            if ($cart->getUsers() === $this) {
                $cart->setUsers(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Messages>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Messages $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setUsers($this);
        }

        return $this;
    }

    public function removeMessage(Messages $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getUsers() === $this) {
                $message->setUsers(null);
            }
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
            $order->setUsers($this);
        }

        return $this;
    }

    public function removeOrder(Orders $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getUsers() === $this) {
                $order->setUsers(null);
            }
        }

        return $this;
    }

    public function isIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getProfilePicture(): ?string
    {
        return $this->profilePicture;
    }

    public function setProfilePicture(?string $profilePicture): static
    {
        $this->profilePicture = $profilePicture;

        return $this;
    }

    public function getArtistName(): ?string
    {
        return $this->artistName;
    }

    public function setArtistName(string $artistName): static
    {
        $this->artistName = $artistName;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }
}
