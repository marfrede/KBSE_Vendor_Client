# KBSE_Vendor_Client ([KBSE_Shop_Server](https://github.com/Teekesselchen/KBSE_VirtuelleLebensmittel "Visit ShopServer on Github!"))
## LEGENDE
### Akteure	
|Akteur|Abkürzung|
|-----------------------------|--------------------------|
| Virtueller Lebensmittelshop | EDH (Easy Delivery Hawk) |
| Kunden des Lebensmittelshops | Kunde |
| Regionale Einzelhändler, die Lebensmittelshop Ware anbieten |	EZHÄ |
| Warenzulieferer |	WL |

### Technische Anforderungen
|Anforderung|Abkürzung|
|-----------------------------|--------------------------|
| REST API des WL, der Aufträge des EDH entgegennimmt |	REST-API-WL |
| REST API von EDH, die Angebote von EZHÄ entgegennehmen |	REST-API-EDH |
| Web-App EDH, wo Kunde Ware bestellen können |	EDH-Store |

## INHALTLICHE ANFORDERUNGEN
- Lebensmittelkauf -> zeitaufwendig, ökologisch fragwürdig, da unterschiedliche Lebensmittel bei vielen verschiedenen Verkäufern
 - _EDH_
    - _EZHÄ_ bieten __Ware__ an 
    - _Kunde_ bestellt __Ware__ von Zuhause
    - _WL_ bringt _Kunde_ die __Ware__
        - Anforderungen an _WL_
            - _WL_ bietet REST API an (Diese REST API wird im Folgenden als REST-API-WL bezeichnet)
            - _EDH_ stellt __Lieferauftrag__ an REST-API-WL (Request)
                - __Lieferauftrag__ ist
                    - Datum + Zeit der Auftragserteilung,
                    - Kundenname (_Kunde_)
                    - Lieferadresse
                    - Gewicht der Lieferung
            - _WL_ benachrichtigt _Kunde_ (evtl. Mail)
                - _WL_ ermöglicht Sendungsverfolgung für K
            - _WL_ kann jährlich wechseln (Flexibilität seitens _EDH_ gefordert)

- _EZHÄ_ registrieren sich bei _EDH_ per REST-API-EDH mit __Angeboten__
- _EZHÄ_ liefern bei jedem Request Benutzername
- _EZHÄ_ adressieren _EDH_ per REST-API-EDH mit __Angeboten__ (_EZHÄ_ Request an _EDH_)
    - __Angebot__ ist
        - Garantierte verfügbare Menge
        - __Ware__
            - Bezeichnung
            - Kurzbeschreibung
            - Preis
            - (optional) Bild

- _EZHÄ_ fragen REST-API-EDH ab nach ihren __Waren__ mit Bestellmenge pro _Kunde_ ab
    - DANN benachrichtigt _EDH_ den _WL_, sodass _WL_ tätig werden kann

- Web-App _EDH_ (EDH-Store)
    - _EDH_ bietet _Kunde_ einen __Warenkatalog__ dar
        - __Warenkatalog__ ist
            - Alle verfügbaren __Angebote__ aller EZHÄ vereint
            - __Warenkatalog__ zeigt dem Nutzer nicht den jeweiligen EZHÄ hinter dem __Angebot__
    - _Kunde_ suchen, finden Waren
    - _Kunde_ haben Warenkorb bei _EDH_
    - _Kunde_ passen __Bestellung__ im Warenkorb an
        - Bestellmenge ändern
        - Ware aus __Bestellung__ löschen
    - __Bestellung__ ist 
        - __Ware__
        - Bestellmenge
        - (Gesamtpreis)
        - (Zeitpunkt der Bestellung)

    - _Kunde_ kaufen __Waren__ (__Bestellung__)
        - _Kunde_ muss angemeldet sein
        - Bezahlung
            - Erfolgt nicht
            - (optional) PayPal

## FUNKTIONALE ANFORDERUNGEN
- JEE7 oder JEE8
- Glassfish 5.x
- CDI Context & Dependeny Injection
- JPA Java Persistence API
- JTA (?) Java Transaction API
- Bean-Validation
- JSF Java Server Faces
    - Mit Primefaces
- JAX-RS (?)
- JSON-B oder JSON-P

- REST-API muss getestet werden
- (optional) EZHÄ Authentifizierung, Autorisierung über JWT (Eclipse Microprofile JWT AUTH)
- (optional) Anti Corruption Layer für häufig wechselnde WL  
