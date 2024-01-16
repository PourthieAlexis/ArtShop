<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240115152143 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE orders ADD carts_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE orders ADD CONSTRAINT FK_E52FFDEEBCB5C6F5 FOREIGN KEY (carts_id) REFERENCES carts (id)');
        $this->addSql('CREATE INDEX IDX_E52FFDEEBCB5C6F5 ON orders (carts_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE orders DROP FOREIGN KEY FK_E52FFDEEBCB5C6F5');
        $this->addSql('DROP INDEX IDX_E52FFDEEBCB5C6F5 ON orders');
        $this->addSql('ALTER TABLE orders DROP carts_id');
    }
}
