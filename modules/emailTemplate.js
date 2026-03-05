// creer un template d'email pour les notifications de l'application
// exemple de template :
/**
 * {
 *   "toEmail": "
 *  "tocontactName": "Jean Dupont",
 *
 * "subject": "Notification Unitable",
 * "htmlContent": "<h1>Bonjour Jean Dupont,</h1><p>Vous avez une nouvelle notification sur Unitable.</p>",
 * "textContent": "Bonjour Jean Dupont, Vous avez une nouvelle notification sur Unitable.",
 * "tags": ["notification", "unitable"]
 *
 *  */
// crééer une variable const pour stocker texte email de bienvenue ainsi que html de bienvenue
// exemple de template de bienvenue :
const welcomeEmail = {
  subject: "Bienvenue sur Unitable !",
  htmlContent: `<h1>Bienvenue sur Unitable, ${{contactName}} !</h1> <p>Nous sommes ravis de vous compter parmi nous. Unitable est votre nouvel espace de travail collaboratif pour gérer vos projets et équipes efficacement.</p>`,
  textContent:
    `Bienvenue sur Unitable, ${{contactName}} ! Nous sommes ravis de vous compter parmi nous. Unitable est votre nouvel espace de travail collaboratif pour gérer vos projets et équipes efficacement.`,
  tags: ["welcome", "unitable"],
};

//exemple mail acces a la page reinitialisation mot de passe :
const resetPasswordEmail = {    
    subject: "Réinitialisation de votre mot de passe Unitable",
    htmlContent: `<h1>Réinitialisation de votre mot de passe Unitable</h1> <p>Bonjour $${{contactName}},</p><p>Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p><a href="${{resetLink}}">Réinitialiser mon mot de passe</a><p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>`,
    textContent: `Réinitialisation de votre mot de passe Unitable Bonjour ${{contactName}}, Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe : ${{resetLink}} Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.`,
    tags: ["reset-password", "unitable"],
};
