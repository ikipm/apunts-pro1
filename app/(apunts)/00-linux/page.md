# Introducció a Linux per a PRO1

## Motivació
En aquesta assignatura, tant en els laboratoris com en els exàmens, trobareu [OpenSuse](https://www.opensuse.org/) instal·lat. És molt interessant familiaritzar-se amb el kernel Linux (en qualsevol de les seves variants) per fer més senzilla l'assignatura.

## Comandes bàsiques

* **cd (*Change Directory*):** Aquesta comanda permet modificar la carpeta (directori) on ens situem. Veguem uns exemples:\
  En cas que vulguem moure'ns a una carpeta anomenada ```dir1```, podríem fer el següent:
  ```bash
  $ cd dir1
  ```
  Un cop dintre del directori ```dir1```, si volem tornar al directori anterior, podem usar ```..```:
  ```bash
  $ cd ..
  ```
  Vegueu [l'estructura de directoris de Linux](#estructura-de-directoris) per a més informació sobre la navegació entre directoris.

* **ls (*List directory contents*):** Ens permet mostrar els arxius que es troben en el directori actual.
  ```bash
  $ ls
  file1.c file2.c
  ```
  **Flags importants**
  ---
  Hi ha una sèrie de paràmetres a tenir en compte per a la comanda ls.
  * ``-a`` (All): Ens permet veure directoris ocults (els que comencen per .).
    ```bash
    $ ls -a
    . .. file1.c file2.c
    ```
    Fixem-nos que en aquest exemple, es mostrar . i .., que es refereixen al directori actual i a l'anterior. Més informació a  [l'estructura de directoris de Linux](#estructura-de-directoris).

  * ``-l`` (List): Mostra una llista, amb més informació, sobre els fitxers de la carpeta.
    ```bash
    $ ls -l
    total 1
    drwxr-xr-x. 1 iker iker  14 21 de set.  09:15 file1.c
    drwxr-xr-x. 1 iker iker  14 21 de set.  09:18 file2.c
    ```
    El contingut d'aquesta comanda escapa de l'objectiu d'aquesta assignatura (ho trobareu a SO, assignatura del Q3).
  * ``-la`` (List all): És una combinació de les 2 comandes anteriors.
    ```bash
    $ ls -la
    total 1
    drwxr-xr-x. 1 iker iker 228 21 de set.  08:21 .
    drwxr-xr-x. 1 iker iker 104 21 de set.  08:25 ..
    drwxr-xr-x. 1 iker iker  14 21 de set.  09:21 file1.c
    drwxr-xr-x. 1 iker iker  14 21 de set.  09:18 file2.c
    ```

## Estructura de directoris
En sistemes de tipus UNIX/Linux, els fitxers i directoris s'organitzen en una **estructura en forma d'arbre**. Tot parteix d'un directori arrel que es simbolitza amb una barra inclinada ``/``. A partir d'aquest directori, construïm tot el sistema de fitxers.

**Directori home**
---
El directori on treballarem s'anomena home, i és privat per a cada usuari. Considerant un usuari arbitrari com ``pro1_user``, la ruta absoluta seria ``/home/pro1_user``. És en aquest directori on trobarem els arxius de l'usuari, i les típiques carpetes com Baixades, Escriptori, Documents, ...

El caràcter de la virguleta (``~``) s'utilitza al terminal com a drecera equivalent a la ruta del directori home de l'usuari actual. És a dir, en el cas anterior, les expressions ``/home/pro1_user`` i ``~`` són equivalents per a l'usuari pro1_user.

**Directoris especials**
---
Tal com haureu observat en els exemples anteriors, en alguns casos apareixen els directoris `.` i `..`. Aquests són referències al directori actual i al directori "pare". Veguem-los en detall:
* **Directori actual (`.`):** El punt simple és un punter que representa el *directori de treball actual* (*Current Working Directory*). Per tant, si ens trobem al directori `dir1`, `.` equivaldria al directori `dir1`. És per aquest motiu que, durant el curs, us trobareu comandes de terminal de l'estil següent:
  ```bash
  $ ./codi.o
  ```
  En aquest cas, el `./` ens indica que es vol executar el fitxer `codi.o` del directori actual (`./`).

* **Directori pare (`..`):** El punt doble (`..`) és un punter que representa el *directori immediatament superior* en la jerarquia de l'arbre (*Parent Directory*).
  Considerant el següent arbre:
  ```
  /
  └── home/
    └── pro1_user/
        ├── codis_jutge/
        └── exercicis_ic/
  ```
  En cas que el directori actual sigui `codis_jutge/`, si volem fer referència al directori pare (en aquest cas `/home/pro1_user`), podem usar `..`.
  També podem combinar el que hem vist, i del directori `codis_jutge/` moure'ns a `exercicis_ic/` amb una sola comanda, fent:
  ```bash
  $ cd ../exercicis_ic/
  ```

