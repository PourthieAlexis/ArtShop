<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240122123257 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE arts (id INT AUTO_INCREMENT NOT NULL, users_id INT DEFAULT NULL, categories_id INT NOT NULL, title VARCHAR(50) NOT NULL, description LONGTEXT NOT NULL, price DOUBLE PRECISION NOT NULL, stock INT NOT NULL, image VARCHAR(255) NOT NULL, INDEX IDX_77F46F3067B3B43D (users_id), INDEX IDX_77F46F30A21214B7 (categories_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE arts_carts (arts_id INT NOT NULL, carts_id INT NOT NULL, INDEX IDX_839ABE241A9F61BA (arts_id), INDEX IDX_839ABE24BCB5C6F5 (carts_id), PRIMARY KEY(arts_id, carts_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE carts (id INT AUTO_INCREMENT NOT NULL, users_id INT DEFAULT NULL, quantity INT NOT NULL, INDEX IDX_4E004AAC67B3B43D (users_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comments (id INT AUTO_INCREMENT NOT NULL, users_id INT NOT NULL, arts_id INT NOT NULL, message VARCHAR(255) NOT NULL, INDEX IDX_5F9E962A67B3B43D (users_id), INDEX IDX_5F9E962A1A9F61BA (arts_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messages (id INT AUTO_INCREMENT NOT NULL, users_id INT DEFAULT NULL, message VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_DB021E9667B3B43D (users_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE orders (id INT AUTO_INCREMENT NOT NULL, users_id INT NOT NULL, carts_id INT DEFAULT NULL, order_date DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', order_status VARCHAR(100) NOT NULL, total_amount DOUBLE PRECISION NOT NULL, INDEX IDX_E52FFDEE67B3B43D (users_id), INDEX IDX_E52FFDEEBCB5C6F5 (carts_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, address VARCHAR(50) NOT NULL, name VARCHAR(50) NOT NULL, UNIQUE INDEX UNIQ_1483A5E9E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE arts ADD CONSTRAINT FK_77F46F3067B3B43D FOREIGN KEY (users_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE arts ADD CONSTRAINT FK_77F46F30A21214B7 FOREIGN KEY (categories_id) REFERENCES categories (id)');
        $this->addSql('ALTER TABLE arts_carts ADD CONSTRAINT FK_839ABE241A9F61BA FOREIGN KEY (arts_id) REFERENCES arts (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE arts_carts ADD CONSTRAINT FK_839ABE24BCB5C6F5 FOREIGN KEY (carts_id) REFERENCES carts (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE carts ADD CONSTRAINT FK_4E004AAC67B3B43D FOREIGN KEY (users_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A67B3B43D FOREIGN KEY (users_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE comments ADD CONSTRAINT FK_5F9E962A1A9F61BA FOREIGN KEY (arts_id) REFERENCES arts (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E9667B3B43D FOREIGN KEY (users_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE orders ADD CONSTRAINT FK_E52FFDEE67B3B43D FOREIGN KEY (users_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE orders ADD CONSTRAINT FK_E52FFDEEBCB5C6F5 FOREIGN KEY (carts_id) REFERENCES carts (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE arts DROP FOREIGN KEY FK_77F46F3067B3B43D');
        $this->addSql('ALTER TABLE arts DROP FOREIGN KEY FK_77F46F30A21214B7');
        $this->addSql('ALTER TABLE arts_carts DROP FOREIGN KEY FK_839ABE241A9F61BA');
        $this->addSql('ALTER TABLE arts_carts DROP FOREIGN KEY FK_839ABE24BCB5C6F5');
        $this->addSql('ALTER TABLE carts DROP FOREIGN KEY FK_4E004AAC67B3B43D');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A67B3B43D');
        $this->addSql('ALTER TABLE comments DROP FOREIGN KEY FK_5F9E962A1A9F61BA');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E9667B3B43D');
        $this->addSql('ALTER TABLE orders DROP FOREIGN KEY FK_E52FFDEE67B3B43D');
        $this->addSql('ALTER TABLE orders DROP FOREIGN KEY FK_E52FFDEEBCB5C6F5');
        $this->addSql('DROP TABLE arts');
        $this->addSql('DROP TABLE arts_carts');
        $this->addSql('DROP TABLE carts');
        $this->addSql('DROP TABLE categories');
        $this->addSql('DROP TABLE comments');
        $this->addSql('DROP TABLE messages');
        $this->addSql('DROP TABLE orders');
        $this->addSql('DROP TABLE users');
    }
}
