let notes = [
    {name: "Aguillon, Mitchell", notes: "Active"},
    {name: "Alfaro, Natalie Danielle", notes: "Active"},
    {name: "Baclawski, Mark", notes: "Active"},
    {name: "Badger, Emily Elizabeth", notes: "Active"},
    {name: "Badger, William David", notes: "Active"},
    {name: "Beus, Dallin Michael", notes: "Active"},
    {name: "Bingham, Miranda", notes: "Active"},
    {name: "Davila, Daisy Belen", notes: "Active"},
    {name: "Denning, Catherine Rose", notes: "Active"},
    {name: "Duncan, Joshua David", notes: "Active"},
    {name: "Fiame, Maurice", notes: "Active"},
    {name: "Gilson, Amanda", notes: "Active"},
    {name: "Gilstrap, Matthew Daniel", notes: "Active"},
    {name: "Gonzalez, Heriberto", notes: "Active"},
    {name: "Guzman, Miguel Angel", notes: "Active"},
    {name: "Hernandez, Jeremy Michael", notes: "Active"},
    {name: "Hilton, Andrew", notes: "Active"},
    {name: "Hilton, Jessica", notes: "Active"},
    {name: "Hofer, Imogen Dauphine", notes: "Active"},
    {name: "Hofer, Lorelai Josephine", notes: "Active"},
    {name: "Howe, Dominick", notes: "Active"},
    {name: "Huang, Coco", notes: "Active"},
    {name: "James, Gary Thomas", notes: "Active"},
    {name: "James, Tari Marie", notes: "Active"},
    {name: "King, Ashley", notes: "Active"},
    {name: "Lebbie, Emmanuella", notes: "Active"},
    {name: "Livings, Dee", notes: "Active"},
    {name: "Livingston, Johnathan", notes: "Active"},
    {name: "Macones, Melissa", notes: "Active"},
    {name: "McAlister, Noah", notes: "Active"},
    {name: "McCrary, David", notes: "Active"},
    {name: "Mendoza, Micaela Leigh", notes: "Active"},
    {name: "Najera, Andrea Lopez", notes: "Active"},
    {name: "Namahoe, Kaimana Yoshiko", notes: "Active"},
    {name: "Nelms, Job", notes: "Active"},
    {name: "Nelms, Kaleb", notes: "Active"},
    {name: "Oyebanji, Opeyemi Odunayo", notes: "Active"},
    {name: "Padovich, Kacie", notes: "Active"},
    {name: "Rigby, James Michael Andrew", notes: "Active"},
    {name: "Rodden, Aubrey Renae", notes: "Active"},
    {name: "Romero, Layla America", notes: "Active"},
    {name: "Sarolia, Devn", notes: "Active"},
    {name: "Siddall, Autumn Mary", notes: "Active"},
    {name: "Tatro, Westley James", notes: "Active"},
    {name: "Taylor, Ammon", notes: "Active"},
    {name: "Tedford, Emily", notes: "Active"},
    {name: "Young, Samuel Orrin", notes: "Active"},
    {name: "Zumbrennen, Ian", notes: "Active"},
    {name: "Zurbuchen, Timothy Ray", notes: "Active"},
    {name: "Hollon, Natalie", notes: "Call"},
    {name: "Murrin, Noah", notes: "Call"},
    {name: "Nguyen, Christine", notes: "Call"},
    {name: "Ruiz, Alexis Maria", notes: "Call"},
    {name: "Whitehead, Spencer Nicholas", notes: "Call"},
    {name: "Zelenuk, Faith", notes: "Call"},
    {name: "Aguillon, Allen", notes: "Known"},
    {name: "Bean, Griffin David", notes: "Known"},
    {name: "Boss, Kevin", notes: "Known"},
    {name: "Carter, Isaiah", notes: "Known"},
    {name: "Collier, Jessi Aleksandra", notes: "Known"},
    {name: "Duff, Danielle", notes: "Known"},
    {name: "Dunlap, Taelor", notes: "Known"},
    {name: "Martinez, Orion Lee", notes: "Known"},
    {name: "Mitchell, Brittany Denae", notes: "Known"},
    {name: "Moreno, Oliblish Xitlaly", notes: "Known"},
    {name: "Neathery, Matthew Ryan", notes: "Known"},
    {name: "Petree, Logan", notes: "Known"},
    {name: "Pettit, Sidney", notes: "Known"},
    {name: "Pollard, Deion Montriel", notes: "Known"},
    {name: "Proctor, Chrissy", notes: "Known"},
    {name: "Qureshi, Tor", notes: "Known"},
    {name: "Riojas, Louis Anthony", notes: "Known"},
    {name: "Smith, Steven", notes: "Known"},
    {name: "Winzenz, Brandon", notes: "Known"},
    {name: "Zurbuchen, Billy Allen", notes: "Known"},
    {name: "Baird, Matthew Dallin", notes: "Missionary"},
    {name: "Pryor, Kayden Orlando", notes: "Missionary"},
    {name: "Bresee, Nichole Nancy", notes: "Move out"},
    {name: "Abdelhi, Marvin E.", notes: ""},
    {name: "Aguillon, Steve", notes: ""},
    {name: "Aguirre, Hailey", notes: ""},
    {name: "Alfaro, Daniel Andrew", notes: ""},
    {name: "Almodovar, Bianca Yara", notes: ""},
    {name: "Anderson, Charlotte", notes: "Active"},
    {name: "Barnes, Courtney", notes: ""},
    {name: "Becerra-Gonzales, Tabitha Raiann", notes: ""},
    {name: "Beck, Catherine", notes: ""},
    {name: "Clark, Abby Jane", notes: ""},
    {name: "Cole, Aaron Anthony", notes: ""},
    {name: "Craig, Emmalie Amber", notes: ""},
    {name: "Craven, Lindley Ann", notes: ""},
    {name: "Cuba, Denise Carolina", notes: ""},
    {name: "Easterling, Ciara Dawn", notes: ""},
    {name: "Eden, Briston", notes: ""},
    {name: "Garcia Gonzalez, Kate Alessandra", notes: ""},
    {name: "Glover, Madison", notes: ""},
    {name: "Halsted, Roberto", notes: ""},
    {name: "Hernandez, Adrian", notes: ""},
    {name: "Hollon, Courtney Shea", notes: ""},
    {name: "Hunter, J'lynn Renee'", notes: ""},
    {name: "King, Zander Jayden", notes: ""},
    {name: "Kollie, Vivian Ruth", notes: ""},
    {name: "Koonce, Jacob Lane", notes: ""},
    {name: "Lanning, Lindsay Jo", notes: ""},
    {name: "Little, Isabelle Sariah", notes: ""},
    {name: "Malicoat, Cianna Annette", notes: ""},
    {name: "McIntosh, Gavlyn Shirlene", notes: ""},
    {name: "Meyer, Kira", notes: ""},
    {name: "Moore, Kjirstina", notes: ""},
    {name: "Neal, Mason Charles", notes: ""},
    {name: "Nibarger, Emily Paige", notes: ""},
    {name: "Norris, Preston", notes: ""},
    {name: "Oladipupo, Juwon", notes: ""},
    {name: "Oladipupo, Taiwo", notes: ""},
    {name: "Palmer, Maryn", notes: ""},
    {name: "Paul, Brian Enrique", notes: ""},
    {name: "Pierre, Christopher", notes: ""},
    {name: "Poole, Dallin", notes: ""},
    {name: "Powers, Kayl Dade", notes: ""},
    {name: "Puempel, Andi", notes: ""},
    {name: "Reber, Jared", notes: ""},
    {name: "Reich, Alexis", notes: ""},
    {name: "Rice, Patrick", notes: ""},
    {name: "Ruben, Kira", notes: ""},
    {name: "Rubio, Jesus Jose II", notes: ""},
    {name: "Ruiz, Joseph Benjamin", notes: ""},
    {name: "Sanders, Paisley", notes: ""},
    {name: "Stuckey, Fay Cady", notes: ""},
    {name: "Stucki, Yabsira", notes: ""},
    {name: "Swinney, Blake", notes: ""},
    {name: "Taggart, Alexis", notes: ""},
    {name: "Taggart, Jordan", notes: ""},
    {name: "Taylor, Austin Thomas", notes: ""},
    {name: "Tijani, Mustapha Ibunkun", notes: ""},
    {name: "Vang, Sheng", notes: ""},
    {name: "Vaituulala, Moeakiola Houston", notes: "Active"},
    {name: "Vargas, Francisco", notes: ""},
    {name: "Villalobos, Maleni", notes: ""},
    {name: "Villazaez, Sofia Gabriela", notes: ""},
    {name: "Weber, Stephanie Louise", notes: ""},
    {name: "Western, Austin Trevor", notes: ""},
    {name: "Winkle, Talon", notes: ""},
    {name: "Wright, Destiny Michelle", notes: ""},
];
