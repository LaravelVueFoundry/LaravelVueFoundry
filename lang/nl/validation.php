<?php

declare(strict_types=1);

return [
    'accepted' => ':attribute dient te worden geaccepteerd.',
    'accepted_if' => ':attribute dient te worden geaccepteerd wanneer :other gelijk is aan :value.',
    'active_url' => ':attribute is geen geldige URL.',
    'after' => ':attribute moet een datum zijn na :date.',
    'after_or_equal' => ':attribute moet een datum zijn na of gelijk aan :date.',
    'alpha' => ':attribute mag alleen letters bevatten.',
    'alpha_dash' => ':attribute mag alleen letters, nummers, en strepen bevatten.',
    'alpha_num' => ':attribute mag alleen letters en nummers bevatten.',
    'array' => ':attribute moet een lijst zijn.',
    'ascii' => ':attribute mag alleen standaard karakters en cijfers bevatten',
    'before' => ':attribute moet een datum zijn eerder dan :date.',
    'before_or_equal' => ':attribute moet een datum zijn voor of gelijk aan :date.',
    'between' => [
        'numeric' => ':attribute moet tussen :min en :max liggen.',
        'file' => ':attribute moet tussen :min en :max kilobytes zijn.',
        'string' => ':attribute moet tussen :min en :max karakters lang zijn.',
        'array' => ':attribute moet tussen :min en :max items bevatten.',
    ],
    'boolean' => ':attribute kan enkel waar of niet waar zijn.',
    'can' => ':attribute bevat een ongeautoriseerde waarde.',
    'confirmed' => ':attribute bevestiging komt niet overeen.',
    'contains' => ':attribute mist een verplichte waarde.',
    'current_password' => 'Het huidige wachtwoord is ongeldig.',
    'date' => ':attribute is geen geldige datum.',
    'date_equals' => ':attribute moet een datum zijn gelijk aan :date.',
    'date_format' => ':attribute komt niet overeen met het formaat :format.',
    'decimal' => ':attribute moet :decimal decimalen bevatten.',
    'declined' => ':attribute dient te worden afgewezen.',
    'declined_if' => ':attribute dient te worden afgewezen wanneer :other :value is.',
    'different' => ':attribute en :other dienen verschillend te zijn.',
    'digits' => ':attribute moet :digits cijfers zijn.',
    'digits_between' => ':attribute moet tussen :min en :max cijfers zijn.',
    'dimensions' => ':attribute heeft een ongeldige grootte.',
    'distinct' => ':attribute heeft een dubbele waarde.',
    'doesnt_end_with' => ':attribute kan niet eindigen met de volgende waardes: :values.',
    'doesnt_start_with' => ':attribute kan niet beginnen met de volgende waardes: :values.',
    'email' => ':attribute dient een geldig emailadres te zijn.',
    'ends_with' => ':attribute moet eindigen met één van het volgende: :values',
    'enum' => 'Geselecteerde :attribute is ongeldig.',
    'exists' => 'Geselecteerde :attribute is ongeldig.',
    'extensions' => ':attribute mag alleen bestanden bevatten die eindigen met :values.',
    'file' => ':attribute moet een bestand zijn.',
    'filled' => ':attribute veld is verplicht.',
    'gt' => [
        'array' => ':attribute moet meer dan :value items bevatten.',
        'file' => ':attribute moet groter zijn dan :value kilobytes.',
        'numeric' => ':attribute moet groter zijn dan :value.',
        'string' => ':attribute moet groter zijn dan :value tekens.',
    ],
    'gte' => [
        'array' => ':attribute moet :value of meer items bevatten.',
        'file' => ':attribute moet groter of gelijk zijn aan :value kilobytes.',
        'numeric' => ':attribute moet groter of gelijk zijn aan :value.',
        'string' => ':attribute moet groter of gelijk zijn aan :value tekens.',
    ],
    'hex_color' => ':attribute moet een geldige kleurwaarde bevatten.',
    'image' => ':attribute dient een afbeelding te zijn.',
    'in' => 'Geselecteerde :attribute is ongeldig.',
    'in_array' => ':attribute komt niet voor in :other.',
    'integer' => ':attribute dient een geheel getal te zijn.',
    'ip' => ':attribute dient een geldig IP adres te zijn.',
    'ipv4' => ':attribute dient een geldig IPv4 adres te zijn.',
    'ipv6' => ':attribute dient een geldig IPv6 adres te zijn..',
    'json' => ':attribute moet een geldige JSON string zijn.',
    'list' => ':attribute moet een list zijn.',
    'lowercase' => ':attribute mag alleen kleine letters bevatten.',
    'lt' => [
        'array' => ':attribute moet minder dan :value items bevatten.',
        'file' => ':attribute moet kleiner zijn dan :value kilobytes.',
        'numeric' => ':attribute moet kleiner zijn dan :value.',
        'string' => ':attribute moet kleiner zijn dan :value tekens.',
    ],
    'lte' => [
        'array' => ':attribute mag maximaal :value items bevatten.',
        'file' => ':attribute moet kleiner of gelijk zijn aan :value kilobytes.',
        'numeric' => ':attribute moet kleiner of gelijk zijn aan :value.',
        'string' => ':attribute moet kleiner of gelijk zijn aan :value tekens.',
    ],
    'mac_address' => ':attribute moet een geldig MAC adres zijn.',
    'max' => [
        'array' => ':attribute mag niet meer dan :max items bevatten.',
        'file' => ':attribute mag niet groter zijn dan :max kilobytes.',
        'numeric' => ':attribute mag niet groter zijn dan :max.',
        'string' => ':attribute mag niet groter zijn dan :max karakters.',
    ],
    'max_digits' => ':attribute mag niet meer dan :max cijfers bevatten.',
    'mimes' => ':attribute dient een bestand te zijn van het type: :values.',
    'mimetypes' => ':attribute dient een bestand te zijn van het type: :values.',
    'min' => [
        'array' => ':attribute dient minimaal :min items te bevatten.',
        'file' => ':attribute dient minimaal :min kilobytes te zijn.',
        'numeric' => ':attribute dient minimaal :min te zijn.',
        'string' => ':attribute dient minimaal :min karakters te bevatten.',
    ],
    'min_digits' => ':attribute moet minstens :min cijfers bevatten.',
    'missing' => ':attribute mag niet worden meegestuurd',
    'missing_if' => ':attribute mag niet worden meegestuurd wanneer :other :value is.',
    'missing_unless' => ':attribute mag niet worden meegestuurd behalve als :other :value is.',
    'missing_with' => ':attribute mag niet worden meegestuurd wanneer :values bestaat.',
    'missing_with_all' => ':attribute mag niet worden meegestuurd wanneer :values meegestuurd wordt.',
    'multiple_of' => ':attribute moet een veelvoud zijn van :value.',
    'not_in' => 'Geselecteerde :attribute is ongeldig.',
    'not_regex' => 'Het formaat van :attribute is ongeldig.',
    'numeric' => ':attribute dient een nummer te zijn.',
    'password' => [
        'letters' => ':attribute moet alleen uit letters bestaan.',
        'mixed' => ':attribute moet minstens één hoofdletter en één kleine letter bevatten.',
        'numbers' => ':attribute moet minstens één nummer bevatten.',
        'symbols' => ':attribute moet minstens één symbool bevatten.',
        'uncompromised' => ':attribute komt voor in een data lek. Kies een ander :attribute.',
    ],
    'present' => ':attribute dient aanwezig te zijn.',
    'present_if' => ':attribute dient aanwezig te zijn als :other gelijk is aan :value.',
    'present_unless' => ':attribute dient aanwezig te zijn tenzij :other gelijk is aan :value.',
    'present_with' => ':attribute dient aanwezig te zijn wanneer :values aanwezig is.',
    'present_with_all' => ':attribute dient aanwezig te zijn wanneer :values aanwezig zijn.',
    'prohibited' => ':attribute is niet toegestaan.',
    'prohibited_if' => ':attribute is niet toegestaan wanneer :other :value is.',
    'prohibited_unless' => ':attribute is niet toegestaan tenzij :other voorkomt in :values.',
    'prohibits' => ':attribute staat niet toe dat :other aanwezig is.',
    'regex' => 'Het formaat van :attribute is ongeldig.',
    'required' => ':attribute is verplicht.',
    'required_array_keys' => ':attribute moet vermeldingen bevatten voor: :values.',
    'required_if' => ':attribute is verplicht wanneer :other gelijk is aan :value.',
    'required_if_accepted' => ':attribute is verplicht wanneer :other is geaccepteerd.',
    'required_if_declined' => ':attribute is verplicht wanneer :other geweigerd is.',
    'required_unless' => ':attribute is verplicht, tenzij :other in :values voorkomt.',
    'required_with' => ':attribute is verplicht wanneer :values aanwezig is.',
    'required_with_all' => ':attribute is verplicht wanneer :values aanwezig is.',
    'required_without' => ':attribute is verplicht wanneer :values niet aanwezig is.',
    'required_without_all' => ':attribute is verplicht wanneer geen van :values aanwezig is.',
    'same' => ':attribute en :other moeten hetzelfde zijn.',
    'size' => [
        'array' => ':attribute moet :size items bevatten.',
        'file' => ':attribute moet :size kilobytes groot zijn.',
        'numeric' => ':attribute moet :size zijn.',
        'string' => ':attribute moet :size karakters lang zijn.',
    ],
    'starts_with' => ':attribute moet beginnen met één van het volgende: :values',
    'string' => ':attribute moet een string zijn.',
    'timezone' => ':attribute moet een geldige tijdszone zijn.',
    'unique' => ':attribute is al bezet.',
    'uploaded' => 'Het uploaden van :attribute is mislukt.',
    'uppercase' => ':attribute moet in hoofdletters zijn.',
    'url' => ':attribute formaat is ongeldig.',
    'ulid' => ':attribute moet een valide ULID zijn.',
    'uuid' => ':attribute moet een valide UUID zijn.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],
];
