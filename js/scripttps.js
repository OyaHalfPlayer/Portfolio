$(document).ready(function() {
  const tpData = {
    1: {
      "CMD / Windows": [
        {
          title: "TP 02 - Découverte de l'Invite de Commandes CMD",
          description: "Navigation arborescente CLI, gestion des fichiers et dossiers (mkdir, ren, del, xcopy), extraction d'informations réseau IP/DNS (ipconfig) et contrôle des processus (tasklist, taskkill).",
          pdf: "tps/1y/B1_TP02_Decouverte_Invite_Commandes_CMD.pdf"
        },
        {
          title: "TP 03 - Maîtrise Avancée du CMD Windows",
          description: "Personnalisation de l'invite de commande et couleurs, gestion des attributs de fichiers masqués (+H), arrêt forcé de processus par PID ou arborescence, et script batch de surveillance continue.",
          pdf: "tps/1y/B1_TP03_Maitrise_CMD_Admin_Systeme_Reseau.pdf"
        },
        {
          title: "TP 04 - Script Batch de Sauvegarde & Journalisation",
          description: "Développement d'un outil d'automatisation de sauvegarde interactive avec variables dynamiques, horodatage, calcul d'indicateurs de volumétrie et traçabilité par journal log.txt structuré.",
          pdf: "tps/1y/B1_TP04_Script_Batch_Sauvegarde_Expert.pdf"
        },
        {
          title: "TP 05 - Audit Système & Analyse Réseau en CLI",
          description: "Audit d'un poste de travail (whoami, systeminfo, hostname, getmac), calculs d'adresses réseau et masques de sous-réseau IPv4, et application des règles de nomenclature d'entreprise.",
          pdf: "tps/1y/B1_TP05_Decouverte_Infos_Systeme_Reseau.pdf"
        },
        {
          title: "TP 06 - Diagnostic & Dépannage Réseau par Paliers",
          description: "Méthode rigoureuse de dépannage réseau par couches ISO (pings par paliers, analyse de chemin tracert, requêtes nslookup) et réinitialisation de la pile TCP/IP et Winsock.",
          pdf: "tps/1y/B1_TP06_Diagnostic_Probleme_Connexion_Reseau.pdf"
        },
        {
          title: "TP 07 - Commandes CMD pour le Support Informatique",
          description: "Maintenance et intégrité du système de fichiers (SFC, CHKDSK), administration des comptes et groupes utilisateurs locaux (net user, net localgroup) et script d'onboarding utilisateur.",
          pdf: "tps/1y/B1_TP07_Commandes_CMD_Support_Informatique.pdf"
        }
      ],
      "PowerShell": [
        {
          title: "TP PowerShell 1 - Cmdlets",
          description: "Découverte du CLI PowerShell : commandes de base, navigation dans les fichiers et répertoires, accès aux propriétés et méthodes d'objets.",
          pdf: "tps/1y/TP01_PS_cmdlets.pdf"
        },
        {
          title: "TP PowerShell 2 - Scripts",
          description: "Utilisation de PowerShell ISE : écriture de scripts, gestion des comptes utilisateurs locaux (création, lecture, suppression) à partir de fichiers texte.",
          pdf: "tps/1y/TP02_PS_script.pdf"
        },
        {
          title: "TP PowerShell 3 - Exercices de scripts",
          description: "Série d'exercices pratiques : conditions, boucles, paramètres, manipulation de fichiers et de processus, génération de bilans système.",
          pdf: "tps/1y/TP03_Exos_script.pdf"
        },
        {
          title: "TP PowerShell 4 - Fonctions",
          description: "Conception de fonctions : syntaxe, paramètres, valeurs par défaut, typage, validations (Mandatory, ValidatePattern, ValidateSet, ValidateLength…).",
          pdf: "tps/1y/TP04_Fonctions_PS.pdf"
        },
        {
          title: "TP PowerShell 4b - Expressions régulières",
          description: "Initiation aux regex : validation de chaînes, immatriculations, adresses e-mail, URLs et adresses IPv4 à l'aide des caractères spéciaux et quantificateurs.",
          pdf: "tps/1y/TP04b_Expression_régulière.pdf"
        },
        {
          title: "TP PowerShell 5 - Gestion des erreurs",
          description: "Gestion des erreurs PowerShell : erreurs fatales et non fatales, variable \\$Error, blocs Try-Catch-Finally, paramètre ErrorAction et ErrorActionPreference.",
          pdf: "tps/1y/TP05_Gestion_erreurs_PS.pdf"
        }
      ],
      "Virtualisation & Multi-boot": [
        {
          title: "TP 01 - Virtualisation VirtualBox & Tiny10",
          description: "Installation d'un hyperviseur Type 2, dimensionnement des ressources (RAM, vCPU, stockage VDI dynamique), intégration de l'Extension Pack USB et des Additions Invité.",
          pdf: "tps/1y/B1_TP01_Installation_VM_VirtualBox_Tiny10.pdf"
        },
        {
          title: "LAB 01 - Installation Dual Boot Windows 10 / Ubuntu",
          description: "Configuration BIOS/UEFI (Secure Boot, Fast Startup), partitionnement multi-boot (NTFS/EXT4), création d'une partition partagée DATA_SHARE et montage automatique au boot (/etc/fstab).",
          pdf: "tps/1y/B1_LAB01_Installation_Dual_Boot_W10_Ubuntu.pdf"
        },
        {
          title: "LAB 02 - Dual Boot & Gestion des Droits NTFS / POSIX",
          description: "Sécurisation de répertoires partagés multi-OS : modélisation et comparaison technique entre les permissions NTFS Windows et les droits d'accès POSIX sous Linux (chmod/chown).",
          pdf: "tps/1y/B1_LAB02_Dual_Boot_Gestion_Utilisateurs_Droits.pdf"
        },
        {
          title: "LAB 03 - Partage Réseau Inter-OS via Samba",
          description: "Déploiement d'un serveur de partage de fichiers hétérogène sous Linux avec Samba, configuration smb.conf, comptes smbpasswd, filtrage pare-feu UFW et montage client Windows.",
          pdf: "tps/1y/B1_LAB03_Partage_Reseau_Windows_Ubuntu_Samba.pdf"
        },
        {
          title: "TP 01 - Installation Xubuntu & Modes Réseau VirtualBox",
          description: "Installation guidée de Xubuntu, partitionnement manuel FHS (/boot, swap, /, /home), étude des modes de cartes réseau virtuelles (NAT, Pont, Host-Only) et paquets APT/dpkg.",
          pdf: "tps/1y/B2_TP01_Installation_Xubuntu_VirtualBox_Modes_Reseau.pdf"
        },
        {
          title: "TP 02 - Environnement Linux Xfce & Gestionnaire LightDM",
          description: "Compréhension de la séquence de démarrage (GRUB 2, LightDM), comparatif des environnements graphiques (Xfce, GNOME, KDE) et réglages d'affichage en machine virtuelle.",
          pdf: "tps/1y/B2_TP02_Environnement_Xfce_Session_LightDM.pdf"
        },
        {
          title: "TP 03 - Additions Invité & Partage Hôte-Invité",
          description: "Compilation et installation des pilotes Guest Additions sous Linux, activation du presse-papier bidirectionnel et configuration du point de montage pour dossier partagé vboxsf.",
          pdf: "tps/1y/B2_TP03_Addons_Invites_VirtualBox_Partages.pdf"
        }
      ],
      "Administration Linux & Sécurité": [
        {
          title: "TP 04 - Gestion des Utilisateurs, Sudo & Consoles TTY",
          description: "Administration des comptes et groupes utilisateurs, sécurisation des privilèges d'administration via sudoers, analyse de /etc/passwd et /etc/shadow, et bascule TTY.",
          pdf: "tps/1y/B2_TP04_Gestion_Utilisateurs_Linux_Sudo_Permissions.pdf"
        },
        {
          title: "LAB 04 - Permissions POSIX & Droits Spéciaux Linux",
          description: "Gestion fine des droits d'accès en notation octale/symbolique, calculs de masques umask, et mise en œuvre des permissions avancées (SUID, SGID, Sticky Bit).",
          pdf: "tps/1y/B2_LAB04_Permissions_Droits_Acces_Linux.pdf"
        },
        {
          title: "LAB 05 - Serveur d'Impression Linux (CUPS)",
          description: "Administration du démon d'impression CUPS, configuration d'imprimantes virtuelles PDF et réseau (HPLIP), gestion de la file d'attente spool et commandes CLI (lp, lpq, cancel).",
          pdf: "tps/1y/B2_LAB05_Gestion_Impression_CUPS_Linux.pdf"
        },
        {
          title: "TP 05 - Déploiement d'Outils d'Administration & Sécurité",
          description: "Installation multi-sources sous Linux (dépôts APT, dépôts PPA, paquets .deb, scripts .sh) d'outils d'audit et cybersécurité : Nmap, Wireshark, Fail2ban, Suricata et Burp Suite.",
          pdf: "tps/1y/B2_TP05_Installation_Outils_Essentiels_Securite.pdf"
        },
        {
          title: "TP 06 & 07 - Scripting Bash & Commandes CLI Avancées",
          description: "Navigation arborescente complexe, manipulation de fichiers (mkdir -p, mv, rm -r), extraction et filtrage de flux de données (head, tail, grep, cut, wc) et historique d'exécution.",
          pdf: "tps/1y/B2_TP06_TP07_Linux_Bash_Commandes_Base_Avancees.pdf"
        }
      ],
      "Réseaux & Équipements Cisco": [
        {
          title: "LAB 01 - Réseau Hybride Filaire / Wi-Fi & Multi-Services",
          description: "Modélisation Packet Tracer d'un réseau local mixte (Ethernet et Wi-Fi), paramétrage du point d'accès SSID, plan d'adressage IP et serveurs Web/DHCP centralisés.",
          pdf: "tps/1y/B2_LAB01_Reseau_Maison_Switch_WiFi_PacketTracer.pdf"
        },
        {
          title: "LAB 02 - Domotique, IoT & Scénarios d'Automatisation",
          description: "Configuration d'une passerelle Home Gateway en Wi-Fi WPA2-PSK/AES, association d'objets connectés, supervision sur smartphone et scénarios domotiques automatisés.",
          pdf: "tps/1y/B2_LAB02_IoT_Maison_Intelligente_Automatisation.pdf"
        },
        {
          title: "LAB 03 - Services Réseau Centralisés & Relais DHCP",
          description: "Déploiement de services réseau d'entreprise (DNS, Web, Mail, TFTP), segmentation sous-réseaux et configuration du routage DHCP via l'agent de relais ip helper-address.",
          pdf: "tps/1y/B2_LAB03_Infrastructure_Services_Reseau_Segmentation.pdf"
        },
        {
          title: "LAB 06 - Mise en Service d'un Switch Cisco Sécurisé",
          description: "Configuration initiale sur Cisco Catalyst 2960 via console PuTTY : politique de nommage, protection du mode privilégié (enable secret), sécurisation console et verrouillage des ports vacants.",
          pdf: "tps/1y/B2_LAB06_Mise_Service_Switch_Cisco_Securise.pdf"
        },
        {
          title: "LAB 07 - Configuration Cisco IOS & Administration SSH",
          description: "Exploration des modes hiérarchiques Cisco IOS, analyse sous Wireshark des risques du protocole Telnet, bascule vers SSH v2 chiffré (clés RSA 2048-bit) et commandes d'audit show.",
          pdf: "tps/1y/B2_LAB07_Premiere_Configuration_Switch_Cisco.pdf"
        },
        {
          title: "LAB 08 - Infrastructure Inter-VLAN & DHCP Cisco",
          description: "Segmentation logique par VLANs d'entreprise, liaisons Trunk 802.1Q, routage inter-VLAN Router-on-a-Stick sur sous-interfaces et distribution DHCP centralisée.",
          pdf: "tps/1y/B2_LAB08_VLANs_Trunk_InterVLAN_DHCP_SSH.pdf"
        }
      ],
      "Serveurs Web & Services Cloud": [
        {
          title: "TP 08 - Serveur Web Sécurisé HTTPS, TLS & MariaDB",
          description: "Configuration du protocole HTTPS (port 443) sous Apache avec certificat OpenSSL RSA 2048-bits auto-signé, redirection HTTP vers HTTPS, moteur PHP et base de données MariaDB.",
          pdf: "tps/1y/B2_TP08_Securisation_Serveur_Web_HTTPS_TLS_MariaDB.pdf"
        },
        {
          title: "TP 09 - Déploiement de Nextcloud sur Pile LAMP",
          description: "Déploiement d'une solution cloud collaboratif Nextcloud sur pile LAMP (Apache, MariaDB, PHP 8.1), paramétrage du VirtualHost, assistant web et intégration d'annuaire LDAP/AD.",
          pdf: "tps/1y/B2_TP09_Installation_NextCloud_Debian_LAMP.pdf"
        }
      ],
      "Bases de Données (SQL)": [
        {
          title: "TP 08 - SQL : Création de Tables, LDD & LMD",
          description: "Modélisation de bases relationnelles : définition de tables avec contraintes d'intégrité (PK, FK, CHECK, NOT NULL), manipulation de données et création de vues sécurisées.",
          pdf: "tps/1y/B1_TP08_SQL_Creation_Tables_LMD_LDD.pdf"
        },
        {
          title: "TP 09 - SQL : Requêtes Avancées & Opérations RGPD",
          description: "Écriture de requêtes d'extraction complexes (SELECT, INNER/LEFT JOIN), filtres et agrégations (SUM), mises à jour ciblées et suppressions conformes au droit à l'oubli RGPD.",
          pdf: "tps/1y/B1_TP09_SQL_SELECT_INSERT_UPDATE_DELETE.pdf"
        }
      ]
    },
    2: {
      "Réseaux & Commutation Cisco": [
        {
          title: "Cisco Lab 1 - Fondations, Sécurité, VLAN & SSH",
          description: "Durcissement d'un switch Cisco Catalyst 2960 de cœur de réseau en contexte PME : accès sécurisé SSH v2, SVI de gestion, segmentation par VLANs et protection Port-Security Sticky.",
          pdf: "tps/2y/LAB1_Cisco_VLAN_SSH_PortSecurity.pdf"
        },
        {
          title: "Cisco Lab 2 - Infrastructure Réseau TravelHorizon & VLANs",
          description: "Déploiement complet de l'infrastructure réseau d'un nouveau site TravelHorizon : segmentation par VLANs métier (Direction, Commercial, Compta, RH), liaisons Trunk 802.1Q, routage inter-VLAN Router-on-a-Stick, multi-pools DHCP et durcissement SSH v2.",
          pdf: "tps/2y/LAB2_Cisco_VLANs_Infrastructure_TravelHorizon.pdf"
        },
        {
          title: "Lab - Routage Statique SISR",
          description: "Configuration manuelle des routes statiques sur routeurs Cisco : définition des routes (ip route), vérification de la table de routage (show ip route), tests de connectivité inter-réseaux et analyse des flux avec Packet Tracer.",
          pdf: "tps/2y/Lab-Routage-Statique-SISR.pdf"
        },
        {
          title: "Lab - Routage Dynamique RIP SISR",
          description: "Mise en œuvre du protocole de routage dynamique RIP v2 sur une infrastructure multi-routeurs Cisco : propagation automatique des routes, convergence réseau, comparaison avec le routage statique et dépannage via debug ip rip.",
          pdf: "tps/2y/Lab-RIP-Routage-Dynamique-SISR.pdf"
        },
        {
          title: "TP 06 - ACL & Filtrage Réseau Cisco",
          description: "Conception et déploiement de listes de contrôle d'accès (ACL standard et étendue) sur routeurs Cisco : filtrage du trafic IP par source/destination/port, application en entrée/sortie d'interface et validation par tests de connectivité ciblés.",
          pdf: "tps/2y/TP06_ACL_Filtrage_reseau.pdf"
        }
      ],
      "Sécurité & Audit Réseau": [
        {
          title: "Lab Nmap - Audit & Scan Réseau BTS SIO SISR",
          description: "Prise en main de Nmap comme outil d'audit réseau : découverte d'hôtes actifs, scans de ports TCP/UDP, détection de versions de services et d'OS (OS fingerprinting), scripts NSE et analyse des résultats pour évaluer la surface d'attaque.",
          pdf: "tps/2y/Lab_Nmap_BTS_SIO_SISR.pdf"
        }
      ],
      "Administration Windows & Active Directory": [
        {
          title: "TP - Réseau Client-Serveur & Windows Server AD",
          description: "Déploiement d'une infrastructure client-serveur sous Windows Server : installation et configuration d'Active Directory Domain Services (AD DS), création d'une forêt/domaine, jonction de postes clients, gestion des utilisateurs et groupes AD, et application de stratégies de groupe (GPO).",
          pdf: "tps/2y/TP_Reseau_Client_Serveur_WinServeur_AD.pdf"
        }
      ],
      "Virtualisation & Hyperviseurs": [
        {
          title: "TP 01 - Prise en main de l'Hyperviseur Proxmox VE sur VirtualBox",
          description: "Déploiement de l'hyperviseur Type 1 Proxmox VE 8.x en virtualisation imbriquée (Nested Virtualization) sous VirtualBox : configuration VT-x/AMD-V, accès par pont, dépôts No-Subscription, création de VM Debian 12 et gestion des accès RBAC.",
          pdf: "tps/2y/TP1_Prise_en_main_sur_VirtualBox.pdf"
        }
      ],
      "Administration Linux & Automatisation": [
        {
          title: "Linux Lab 1 - Commandes Fondamentales & Scripting MOTD",
          description: "Maîtrise du terminal Linux Ubuntu CLI : navigation POSIX arborescente, analyse comparative des liens symboliques vs physiques (inodes) et développement d'un script Bash d'accueil MOTD.",
          pdf: "tps/2y/LAB1_Linux_Commandes_Fondamentales.pdf"
        },
        {
          title: "Linux Lab 2 - Utilisateurs, Groupes & Sécurité des Comptes",
          description: "Administration approfondie des comptes utilisateurs et groupes sous Ubuntu (useradd, groupadd, usermod), gestion de l'expiration des mots de passe (chage) et audit de /etc/shadow.",
          pdf: "tps/2y/LAB2_Linux_Utilisateurs_Groupes_Debutant.pdf"
        }
      ]
    }
  };

  let currentYear = 1;

  function renderTPs() {
    const categories = tpData[currentYear] || {};
    const container = $('#tp-container');

    if (Object.keys(categories).length === 0) {
      container.html('<div class="empty-state"><p>Aucun TP disponible pour cette sélection</p></div>');
      return;
    }

    let html = '';
    
    for (const [categoryName, tps] of Object.entries(categories)) {
      if (tps.length === 0) continue;
      
      html += `
        <div class="category-box">
          <h2 class="category-title">${categoryName}</h2>
          <div class="tp-list">
      `;
      
      tps.forEach(tp => {
        html += `
            <div class="tp-card">
              <h3>${tp.title}</h3>
              <p>${tp.description}</p>
              <button class="tp-card-link open-pdf" data-pdf="${tp.pdf}" data-title="${tp.title}">Voir le TP</button>
            </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
    
    container.html(html);

    attachPdfListeners();
  }

  function attachPdfListeners() {
    $('.open-pdf').click(function() {
      const pdfPath = $(this).data('pdf');
      const title = $(this).data('title');
      openPdfModal(pdfPath, title);
    });
  }

  function openPdfModal(pdfPath, title) {
    $('#modalTitle').text(title);
    $('#pdfViewer').attr('src', pdfPath);
    $('#pdfModal').addClass('active');
  }

  // Fermer la modal
  $('#closeModal').click(function() {
    $('#pdfModal').removeClass('active');
    $('#pdfViewer').attr('src', '');
  });

  // Fermer la modal en cliquant en dehors
  $('#pdfModal').click(function(e) {
    if (e.target === this) {
      $('#pdfModal').removeClass('active');
      $('#pdfViewer').attr('src', '');
    }
  });

  // Fermer la modal avec la touche Échap
  $(document).keydown(function(e) {
    if (e.key === 'Escape') {
      $('#pdfModal').removeClass('active');
      $('#pdfViewer').attr('src', '');
    }
  });

  // Gestion des clics sur les années
  $('.year-btn').click(function() {
    $('.year-btn').removeClass('active');
    $(this).addClass('active');
    currentYear = $(this).data('year');
    renderTPs();
  });

  // Affichage initial
  renderTPs();
});
