<?php

declare(strict_types=1);

return [
    'title' => 'Welkom, :name!',
    'meta.title' => 'Dashboard',
    'meta.description' => 'Uw persoonlijke dashboard.',
    'edit' => [
        'title' => 'Bewerk Profiel',
        'meta.title' => 'Bewerk uw profiel',
        'meta.description' => 'Bewerk uw gebruikersprofiel.',
    ],
    'info' => [
        'title' => 'Profiel Informatie',
        'intro' => 'Werk de profiel informatie van uw profiel en uw e-mailadres bij.',
        'field.name' => 'Volledige Naam',
        'field.name.placeholder' => 'Jan Jansen',
        'field.email' => 'E-mail',
        'field.email.placeholder' => 'info@example.com',
        'email.unverified' => 'Uw e-mailadres is niet geverifieerd.',
        'email.verify-resend' => 'Klik hier om de verificatie-email opnieuw te versturen.',
        'email.verify-sent' => 'Een nieuwe verificatielink is naar uw e-mailadres verstuurd.',
        'submit' => 'Bijwerken',
        'submit.success' => 'Uw profiel informatie is bijgewerkt.',
    ],
    'update-pass' => [
        'title' => 'Wachtwoord Bijwerken',
        'intro' => 'Om veilig te blijven, gebruik een lang en willekeurig wachtwoord voor uw account.',
        'field.pass-current' => 'Huidig Wachtwoord',
        'field.pass-current.placeholder' => '',
        'field.pass-new' => 'Nieuw Wachtwoord',
        'field.pass-new.placeholder' => '',
        'field.pass-confirm' => 'Bevestig Wachtwoord',
        'field.pass-confirm.placeholder' => '',
        'submit' => 'Bijwerken',
        'submit.success' => 'Uw wachtwoord is bijgewerkt.',
    ],
    'update-avatar' => [
        'title' => 'Profiel Afbeelding Bijwerken',
        'field.new-image.label' => 'Nieuwe Afbeelding',
        'field.new-image.btn' => 'Kies bestand',
        'field.new-image.nofile' => 'Geen bestand gekozen',
        'delete' => 'Verwijder avatar',
        'delete.success' => 'Uw profiel afbeelding is verwijderd.',
        'delete.modal' => [
            'heading' => 'Avatar verwijderen?',
            'intro' => 'Weet u zeker dat u uw avatar wilt verwijderen?',
            'cancel' => 'Annuleren',
            'submit' => 'Verwijder avatar',
        ],
        'submit' => 'Bijwerken',
        'submit.success' => 'Uw profiel afbeelding is bijgewerkt.',
    ],
    'delete' => [
        'title' => 'Account Verwijderen',
        'intro' => 'Wanneer uw account wordt verwijderd, zullen alle bronnen en gegevens permanent worden verwijderd. Download voordat u uw account verwijdert alle gegevens of informatie die u wilt behouden.',
        'modal' => [
            'button' => 'Verwijder Account',
            'heading' => 'Uw account verwijderen?',
            'title' => 'Weet u zeker dat u uw account wil verwijderen?',
            'intro' => 'Wanneer uw account wordt verwijderd, zullen alle bronnen en gegevens permanent worden verwijderd. Vul alstublieft uw wachtwoord in om te bevestigen dat u uw account permanent wilt verwijderen.',
            'field.password' => 'Wachtwoord',
            'field.password.placeholder' => '',
            'cancel' => 'Annuleren',
            'submit' => 'Verwijder Account',
        ],
    ],
];
