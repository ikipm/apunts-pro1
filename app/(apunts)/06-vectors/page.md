# Vectors

Un ordinador actual té almenys 4GB de memòria, i a 32 bits per cada `int`, permet emmagatzemar **1 bilió d'enters**! Hem d'entendre quan un programa pot processar seqüències sense emmagatzemar-les, però si ens cal emmagatzemar tota la seqüència, tenim molt d'espai disponible!

## Un vector és una seqüència de variables del mateix tipus

Els vectors són col·leccions de variables del mateix tipus, col·locades _consecutivament a la memòria_, i a les que accedim mitjançant un índex.

Vegem un exemple a on necessitem moltes variables: suposem que volem comptar quantes vegades ha sortit cada lletra en un text. Necessitariem 26 comptadors. Això es pot fer a mà

```c++
int as = 0, bs = 0, cs = 0, ds = 0, es = 0, fs = 0, ...; // 26 variables
```

però és una feinada i molt propens a errors i seria un codi molt difícil de modificar. Per altra banda, i si volem milers de comptadors perquè tenim caràcters xinesos?

### Declaració de vectors i inicialització amb constructor

El que podem fer és declarar un vector `comptadors` amb 26 caselles totes a 0:

```c++
vector<int> comptadors(26, 0);
```

Abans de poder fer servir vectors cal posar `#include <vector>` a dalt de tot del programa, que fa disponible el tipus `vector`. La declaració té les següents parts:

- `vector<int>`: el tipus, un vector d'enters, la part entre els angles `<` i `>`, que vol dir una col·lecció de variables totes de tipus `int`. El tipus de les caselles pot ser qualsevol altre.

- `comptadors`: el nom de la variable.

- `(26, 0)`: els paràmetres del **constructor**, que és la funció encarregada d'inicialitzar el vector (això ho veurem amb més detall a PRO2). Per ara, només cal saber que aquesta funció rep els 2 paràmetres que hem posat entre parèntesis, que són: el tamany del vector (`26`); i el valor inicial de totes les caselles (`0`). Cal notar que la declaració _no és una crida a una funció_, però els parèntesis hi són perquè la inicialització del vector sí crida, automàticament, la funció que anomenem **constructor**.

Si ometem el segon paràmetre, el valor inicial de cada casella és l'element nul del tipus de les caselles (per als `int`s és 0, per als `bool` és `false`, per als `char` és `'\0'`, per als `double` és 0.0, etc). Per tant, els vectors sempre estan ben inicialitzats, tinguin les caselles que tinguin. No tenen el problema de les variables individuals, que cal inicialitzar sempre.

Vegem més declaracions de vectors:

```c++
vector<char> v1;      // vector de caràcters amb 0 caselles (buit)
vector<bool> v2(100); // vector de booleans amb 100 caselles (totes a fals)
vector<int>  v3(15, -1); // 15 caselles totes a -1
vector<double> v4(10, 0.01); // 10 caselles a 0.01
```

### Inicialització amb claus

Per posar valors inicials diferents a les caselles, també podem fer servir les claus (`{` i `}`), que ens permeten indicar el valor de cada element:

```c++
vector<int> v1 = { 1, 2, 3, 4 };
vector<char> v2 = { 'h', 'o', 'l', 'a' };
vector<bool> v3 = { true, false, true };
vector<string> v4 = { "", "a", "---" };
vector<int> v5 = {}; // buit
```

El tamany de cada vector es determinarà automàticament, no cal posar-lo. I és important no barrejar les dues maneres (amb constructor o amb claus) d'inicialitzar un vector, perquè no són compatibles.

### Accés a les caselles

Ara que tenim les 26 variables, volem accedir a totes elles. Per fer-ho només cal fer servir l'índex. La novetat aquí és que els índexs en C++ (i la majoria de llenguatges), són la _distància a la primera variable del vector_. És a dir, no comencen per 1, sinó per 0 (la distància de la primera variable a la primera variable és 0, oi?).

El diagrama d'un vector de N caselles és el següent:

![Diagrama Vector](vector.opt.svg)

i ens diu que els índexs del vector `comptadors` van del 0 al 25. És molt comú cometre errors amb això al principi. Cal tenir present, per exemple, que el tamany, 26, és 1 més gran que l'índex de l'últim element.

Cada variable individual del vector s'anomena `comptadors[i]`, a on `i` seria l'índex, i es pot tractar de la mateixa manera que tractem una variable de tipus `int`. Vegem-ho:

```c++
vector<int> comptadors(26, 0); // Repetim la declaració per claredat
comptadors[0] = 1;             // posem un 1 a la primera casella
comptadors[1] = comptadors[0] + 7; // posem 7 + la 1a casella a la segona.
comptadors[25] = -1;           // Posem un -1 a la última
comptadors[25] *= 10;          // Multipliquem per 10 la última
```

Malgrat de `comptadors` sabem el tamany, sovint rebrem vectors dels quals no tenim constància del tamany. Això es podria resoldre tenint variables extra pel tamany, però els vectors ens poden dir el seu tamany cridant al mètode `size` (els mètodes també els veurem a PRO2). Per exemple:

```c++
cout << "Tenim " << comptadors.size() << " comptadors." << endl;
comptadors[comptadors.size() - 1]--; // decrementa l'última casella
```

### Els índexs ens permeten automatitzar l'accés a les variables (o caselles) del vector

Donat que les variables d'un vector es poden accedir amb un enter, podem fer el següent:

```c++
vector<int> v = {1, 2, 3, 4, 5};
int i = 0;
v[i] = 100;
i++;
v[i] = -100;
i++;
v[i] = 200;
```

És a dir, no cal indicar una variable concreta quan l'accedim, sinó que l'índex pot estar guardat en una variable també. Això obre la porta a una de les iteracions més utilitzades en programació, que consisteix en aplicar la mateixa transformació a totes les caselles d'un vector:

```c++
vector<int> v(100);
for (int i = 0; i < v.size(); i++) {
    v[i] = i+1;
}
```

El `for`, ja sigui per un vector de 100, de 1000, o de 1000000 caselles, passarà per totes i hi posarà l'índex més 1, que vol dir estarà omplert amb la seqüència 1, 2, 3... fins a l'última casella. En l'exemple la última casella, `v[99]` conté el valor 100.

### Comptar lletres

Seguint amb l'exemple de les lletres, fem un programa que rep una seqüència de lletres minúscules i compta quantes vegades ha aparegut cadascuna a la seqüència:

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> comptadors(26, 0); // es podria ometre el 0
    char lletra;
    while (cin >> lletra) {
        int index = lletra - 'a';  // distància a la 'a' (0-25)
        comptadors[index]++;       // incrementem el comptador de la lletra
    }
    for (char c = 'a'; c <= 'z'; c += 1) {
        const int total = comptadors[c - 'a'];
        if (total > 0) {
            cout << c << ": " << total << endl;
        }
    }
}
```

## El tamany d'un vector es pot canviar en temps d'execució amb `push_back`

Malgrat amb l'exemple de les lletres el nombre de comptadors era fixe pel tipus de problema que hem resolt, els vectors es poden redimensionar. És a dir, podem afegir més caselles si les necessitem. Quan fem funcions recursives el límit és la pila d'execució (que té com a màxim 16MB). Però amb els vectors, les caselles s'emmagatzemen totes juntes a la memòria dinàmica, que només té com a límit la memòria disponible. Això ens permet fer el que dèiem al principi del tema, que és emmagatzemar una seqüència sencera.

El que ens permet fer un vector més gran és un mètode, o sigui una funció associada als vectors (tal com `size`), que es diu `push_back`, i afegeix una sola casella al final:

```c++
vector<int> v = {1, 2, 3, 4};
v.push_back(5);
```

El mètode `push_back` és prou eficient com perquè poguem emmagatzemar tots els valors d'una seqüència així:

```c++
vector<int> seq;
int x;
while (cin >> x) {
    seq.push_back(x);
}
cout << "He llegit " << seq.size() << " elements" << endl;
```

Existeixen molts més mètodes per fer altres coses amb vectors, com ara eliminar caselles, reduïr el tamany en una casella, esborrar tots els elements de cop, etc. Tots ells els veurem a PRO2 i a PRO1 simplement ens limitarem a crear vectors amb un cert tamany i fer-los créixer de mica en mica amb `push_back`.

### Exemple: comptar el número de cops que surt l'últim element en una seqüència

Donat que si esperem que aparegui l'últim element per veure'l i no guardem res haurem perdut la seqüència, aquest problema clarament ens demana emmagatzemar-ho tot i fer el comptatge al final.

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
	vector<int> seq;
	int x;
	while (cin >> x) {
		seq.push_back(x);
	}

	if (seq.size() == 0) {
		cout << "No hi ha elements" << endl;
		return 0;
	}

	const int ultim = seq[seq.size() - 1];
	int cont_ultim = 0;
	for (int i = 0; i < seq.size(); i++) {
		if (seq[i] == ultim) {
			cont_ultim++;
		}
	}

	cout << "L'element " << ultim << " surt "
	     << cont_ultim << " vegades" << endl;
	return 0;
}
```

### Si assignem un vector a un altre se'n fa una còpia

Els vectors es poden assignar i comparar de cop, sense haver de fer una iteració, donat que tenen els operadors `=` i `==` definits. Per exemple:

```c++
vector<int> v = {1, 2, 3, 4, 5};
vector<int> w = v; // w és una còpia de v
if (v == w) {
    cout << "v i w són iguals" << endl;
}
```

Això és una mica perillós, donat que a darrere d'una instrucció com `w = v`, essent `w` i `v` vectors, podria haver-hi la feina de copiar milions de valors si el vector `v` té milions de caselles. La comparació amb `==` és casella a casella, però com es pot suposar, realitza una cerca que s'atura en el moment en què un mateix índex té valors diferents als dos vectors.

### Si passem un vector a una funció per valor se'n fa una còpia

Donat que l'assignació de vectors fa una còpia del vector i això pot ser costós (en funció del tamany), la inicialització de paràmetres té el mateix problema. Un programa com:

```c++
void f(vector<int> w) {
    cout << w[w.size()-1] << endl;
}

int main() {
    vector<int> v(1000000);
    f(v);
}
```

és **horriblement ineficient** perquè, per passar `v` a la funció `f`, ha de copiar _un milió d'enters_, cosa que és increïblement més costosa que la poca feina que fa `f`, que només mostra per pantalla l'últim element de `w`.

Per tant està clar que **no volem copiar vectors** quan els passem com a paràmetres, sota cap concepte!

Per arreglar-ho utilitzarem la següent regla: sempre passarem el vector **per referència** (que evita la còpia). A més, si no esperem modificar el vector, afegirem `const` per indicar que la única cosa que fem és llegir els valors de dins del vector. Això evita errors i comunica la nostra intenció a qualsevol lector del programa.

Per tant, la funció `f` del programa anterior cal canviar-la a:

```c++
void f(const vector<int>& w) {
    cout << w[w.size()-1] << endl;
}
```

amb `const` perquè no necessita modificar `w`, ja que només consulta l'últim element per mostrar-lo per pantalla.

Per funcions que necessiten modificar el vector no posarem `const`:

```c++
void omple_amb(vector<int>& v, int valor) {
    for (int i = 0; i < v.size(); i++) {
        v[i] = valor;
    }
}
```

La funció recorre totes les caselles del vector (tots els índexs), i assigna `valor` a totes elles.

## Exemple: mostrar una seqüència de paraules al revés

Per fer aquest problema també hem d'emmagatzemar tota la seqüència per poder començar a mostrar alguna cosa per pantalla:

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<string> paraules;
    string p;
    while (cin >> p) {
        paraules.push_back(p);
    }
    for (int i = paraules.size() - 1; i >= 0; i--) {
        cout << paraules[i] << endl;
    }
}
```

És de destacar en aquest programa la iteració

```c++
for (int i = paraules.size() - 1; i >= 0; i--) {
    // ...
}
```

ja que té tres diferències clau amb la iteració en ordre ascendent, que són un focus d'errors típic:

1. Es comença per l'últim element, que és `paraules.size()-1`;
2. s'acaba a 0, que requereix que la comparació sigui _major o igual_, `>=`; i
3. cal _decrementar_ la `i` a cada iteració amb `i--`.

És difícil de comptar quantes vegades qualsevol programador ha errat alguna d'aquestes 3 diferències i se n'ha adonat més tard quan el programa ha fallat. Cal practicar aquestes iteracions descendents per poder-les escriure de memòria sense fallar.

### Exemples: seqüència de nombres racionals al revés

Si volem emmagatzemar una seqüència d'elements que tenen més d'una dada, podem fer un vector de tuples:

```c++
struct Racional {
    int num, den;
};

int main() {
    vector<Racional> seq;
    Racional r;
    char barra;
    while (cin >> r.num >> barra >> r.den) {
        seq.push_back(r);
    }
    for (int i = seq.size()-1; i >= 0; i--) {
        cout << seq[i].num << '/' << seq[i].den << endl;
    }
}
```

És interessant destacar d'aquest programa com declarem una variable `r` que, al ser un `Racional`, ens permet fer un `push_back` directament, i també és la que fem servir a la lectura. Això és molt més àgil que haver de declarar variables separades i haver de traspassar les dades d'un lloc a un altre.
