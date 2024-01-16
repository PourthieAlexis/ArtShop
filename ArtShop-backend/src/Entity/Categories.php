<?php

namespace App\Entity;

use App\Repository\CategoriesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoriesRepository::class)]
class Categories
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'categories', targetEntity: Arts::class)]
    private Collection $arts;

    public function __construct()
    {
        $this->arts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
            $art->setCategories($this);
        }

        return $this;
    }

    public function removeArt(Arts $art): static
    {
        if ($this->arts->removeElement($art)) {
            // set the owning side to null (unless already changed)
            if ($art->getCategories() === $this) {
                $art->setCategories(null);
            }
        }

        return $this;
    }
}
