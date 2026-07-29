# 🏢 UniTable — Backend

> **Une API de gestion pour les restaurants** — Un backend Node.js/Express avec MongoDB pour gérer les utilisateurs, établissements, services, employés, équipes et plannings.

[![Node.js](https://img.shields.io/badge/Node.js-16%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.16.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.2.3-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-9.2.3-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-9.0.3-000000?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)
[![Day.js](https://img.shields.io/badge/Day.js-1.11.19-FF6B6B?style=for-the-badge)](https://day.js.org/)
[![Axios](https://img.shields.io/badge/Axios-1.13.6-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![License: BSL](https://img.shields.io/badge/License-BSL_1.1-orange.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📜 À propos du projet

**UniTable Backend** est un projet de fin de formation conçu en groupe, en 10 jours.
C'est une **API RESTful** conçue pour les organisations qui ont besoin de gérer leurs employés, services, équipes et plannings de manière centralisée. Elle permet de :

- Gérer les utilisateurs avec authentification JWT
- Créer et gérer des établissements
- Définir des services avec des rôles spécifiques
- Gérer les employés et leurs informations
- Créer des équipes et assigner des employés
- Planifier et gérer les horaires de travail
- Envoyer des emails via templates

Idéal pour les restaurants, mais s'adapte à tout type d'entreprise, association ou toute organisation ayant besoin d'une gestion centralisée de ses ressources humaines.

---

## 🔧 Stack Technique

| Catégorie            | Technologie                                                  | Version | Rôle                                  |
| -------------------- | ------------------------------------------------------------ | ------- | ------------------------------------- |
| **Runtime**          | [Node.js](https://nodejs.org/)                               | 16+     | Environnement d'exécution             |
| **Framework**        | [Express.js](https://expressjs.com/)                         | 4.16.1  | Framework web                         |
| **Base de données**  | [MongoDB](https://www.mongodb.com/)                          | Atlas   | Base de données NoSQL                 |
| **ODM**              | [Mongoose](https://mongoosejs.com/)                          | 9.2.3   | Modélisation MongoDB                  |
| **Authentification** | [JWT](https://jwt.io/)                                       | 9.0.3   | Génération et vérification des tokens |
| **Hashage**          | [bcrypt](https://www.npmjs.com/package/bcrypt)               | 6.0.0   | Hashage des mots de passe             |
| **Dates**            | [Day.js](https://day.js.org/)                                | 1.11.19 | Manipulation des dates                |
| **HTTP Client**      | [Axios](https://axios-http.com/)                             | 1.13.6  | Requêtes HTTP externes                |
| **CORS**             | [cors](https://www.npmjs.com/package/cors)                   | 2.8.6   | Middleware CORS                       |
| **Cookies**          | [cookie-parser](https://www.npmjs.com/package/cookie-parser) | 1.4.4   | Gestion des cookies                   |
| **Logging**          | [morgan](https://www.npmjs.com/package/morgan)               | 1.9.1   | Logger HTTP                           |
| **Tests**            | [Jest](https://jestjs.io/)                                   | 30.2.0  | Framework de tests                    |
| **Tests HTTP**       | [Supertest](https://github.com/visionmedia/supertest)        | 7.2.2   | Tests des endpoints                   |
| **Tokens**           | [uid2](https://www.npmjs.com/package/uid2)                   | 1.0.0   | Génération d'IDs uniques              |
| **Environnement**    | [dotenv](https://www.npmjs.com/package/dotenv)               | 17.3.1  | Gestion des variables d'environnement |

---

## ✨ Fonctionnalités

### 👤 Gestion des Utilisateurs

- Inscription et connexion avec JWT
- Hashage sécurisé des mots de passe (bcrypt)
- Récupération du profil utilisateur
- Mise à jour des informations
- Suppression de compte

### 🏢 Gestion des Organisations

- Création d'organisations
- Association d'utilisateurs aux organisations
- Gestion des informations organisationnelles
- Liste des organisations de l'utilisateur

### 📋 Gestion des Services

- Création de services au sein d'une organisation
- Définition des rôles pour chaque service
- Association des services aux employés
- Liste des services disponibles

### 👥 Gestion des Employés

- Ajout d'employés à une organisation
- Association d'employés à des services
- Gestion des informations personnelles
- Historique et suivi

### 👥 Gestion des Équipes

- Création d'équipes
- Ajout d'employés aux équipes
- Organisation hiérarchique
- Gestion des permissions

### 📅 Gestion des Plannings

- Création de plannings
- Association des employés aux plannings
- Gestion des horaires et disponibilités
- Visualisation par semaine/mois

### 📧 Gestion des Emails

- Envoi d'emails via templates
- Notifications aux employés
- Confirmations et rappels

---

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) (ou instance locale)

### Étapes

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/dankysten/unitable-backend.git
   cd unitable-backend
   ```

2. **Installer les dépendances**

   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configurer l'environnement**
   Créer un fichier `.env` à la racine avec les variables suivantes :

   ```env
   CONNECTION_STRING=mongodb+srv://<user>:<password>@cluster0.XXXXXXX.mongodb.net/unitable
   PORT=4000
   JWT_SECRET=<ta_clé_secrète>
   ```

4. **Lancer le serveur**

   ```bash
   # Mode développement
   yarn nodemon
   # ou
   npm run nodemon

   # Mode production
   yarn start
   # ou
   npm start
   ```

5. **Accéder à l'API**
   ```
   🚀 Serveur lancé sur le port 4000
   ```
   L'API sera disponible à l'URL : `http://localhost:4000`

---

## 📡 Endpoints API

### 🔹 Base URL

```
http://localhost:4000
```

### 🔹 Utilisateurs

| Méthode | Endpoint         | Description                         |
| ------- | ---------------- | ----------------------------------- |
| POST    | `/users/signup`  | Inscription d'un nouvel utilisateur |
| POST    | `/users/login`   | Connexion et réception du token JWT |
| GET     | `/users/profile` | Récupère le profil utilisateur      |
| PUT     | `/users/profile` | Met à jour le profil                |
| DELETE  | `/users/profile` | Supprime le compte                  |

### 🔹 Organisations

| Méthode | Endpoint             | Description                                 |
| ------- | -------------------- | ------------------------------------------- |
| GET     | `/organizations`     | Récupère les organisations de l'utilisateur |
| GET     | `/organizations/:id` | Récupère une organisation spécifique        |
| POST    | `/organizations`     | Crée une nouvelle organisation              |
| PUT     | `/organizations/:id` | Met à jour une organisation                 |
| DELETE  | `/organizations/:id` | Supprime une organisation                   |

### 🔹 Services

| Méthode | Endpoint        | Description                              |
| ------- | --------------- | ---------------------------------------- |
| GET     | `/services`     | Récupère les services d'une organisation |
| GET     | `/services/:id` | Récupère un service spécifique           |
| POST    | `/services`     | Crée un nouveau service                  |
| PUT     | `/services/:id` | Met à jour un service                    |
| DELETE  | `/services/:id` | Supprime un service                      |

### 🔹 Employés

| Méthode | Endpoint        | Description                              |
| ------- | --------------- | ---------------------------------------- |
| GET     | `/employee`     | Récupère les employés d'une organisation |
| GET     | `/employee/:id` | Récupère un employé spécifique           |
| POST    | `/employee`     | Ajoute un nouvel employé                 |
| PUT     | `/employee/:id` | Met à jour un employé                    |
| DELETE  | `/employee/:id` | Supprime un employé                      |

### 🔹 Équipes

| Méthode | Endpoint     | Description                             |
| ------- | ------------ | --------------------------------------- |
| GET     | `/teams`     | Récupère les équipes d'une organisation |
| GET     | `/teams/:id` | Récupère une équipe spécifique          |
| POST    | `/teams`     | Crée une nouvelle équipe                |
| PUT     | `/teams/:id` | Met à jour une équipe                   |
| DELETE  | `/teams/:id` | Supprime une équipe                     |

### 🔹 Plannings

| Méthode | Endpoint        | Description                               |
| ------- | --------------- | ----------------------------------------- |
| GET     | `/planning`     | Récupère les plannings d'une organisation |
| GET     | `/planning/:id` | Récupère un planning spécifique           |
| POST    | `/planning`     | Crée un nouveau planning                  |
| PUT     | `/planning/:id` | Met à jour un planning                    |
| DELETE  | `/planning/:id` | Supprime un planning                      |

### 🔹 Emails

| Méthode | Endpoint  | Description                  |
| ------- | --------- | ---------------------------- |
| POST    | `/emails` | Envoie un email via template |

---

## 📁 Structure du Projet

```
unitable-backend/
├── app.js                    # Configuration Express et middlewares
├── package.json             # Dépendances et scripts
├── .env                     # Variables d'environnement
├── .gitignore               # Fichiers ignorés par Git
│
├── bin/
│   └── www                  # Script de démarrage
│
├── models/
│   ├── connection.js        # Connexion à MongoDB
│   ├── CT.js                # Modèle CT
│   ├── organizations.js     # Modèle Organization
│   ├── services.js          # Modèle Service
│   ├── teams.js             # Modèle Team
│   └── users.js             # Modèle User
│
├── modules/
│   ├── checkBody.js         # Middleware de validation
│   └── emailTemplate.js     # Templates d'emails
│
├── routes/
│   ├── index.js             # Route racine
│   ├── users.js             # Routes utilisateurs
│   ├── organizations.js     # Routes organisations
│   ├── services.js          # Routes services
│   ├── employee.js          # Routes employés
│   ├── teams.js             # Routes équipes
│   ├── planning.js          # Routes plannings
│   └── emails.js            # Routes emails
│
├── public/                  # Fichiers statiques
│
├── tests/                   # Tests
│   ├── app.test.js          # Tests de l'application
│   └── users.test.js        # Tests des utilisateurs
│
└── node_modules/            # Dépendances installées
```

---

## 🧪 Tests

Le projet ayant été conçu pour une évaluation de fin de formation, il inclut des tests Jest pour valider le fonctionnement de l'API :

- **Tests d'intégration** avec Supertest
- **Tests unitaires** des modèles
- **Tests des endpoints** principaux

Pour lancer les tests :

```bash
yarn test
# ou
npm test
```

---

## 📜 Licence

Ce projet est sous **Business Source License 1.1**.

- **Usage personnel/éducatif** : Gratuit et autorisé
- **Usage commercial** : Requiert une licence payante
- Après 5 ans : Le projet passera sous licence Apache 2.0

Pour une licence commerciale : contact@unitable.fr

---

## 👤 Auteurs

| 📌 **Romain Authier** </br> 📧 [dankysten](https://github.com/dankysten) | 📌 **Fabien D.** </br> 📧 [tunguskha](https://github.com/tunguskha) | 📌 **Yécine H.** </br> 📧 [yecinepro-dot](https://github.com/yecinepro-dot) |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------- |

---

> _"Une bonne organisation est la clé du succès."_ 🏢✨
