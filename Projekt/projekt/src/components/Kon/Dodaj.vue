<template>
    <div class="dodajkonia">
        <h1>Dodaj Konia</h1>
        <table>
            <thead>
                <tr>
                    <th>
                        Numer
                    </th>
                    <th>
                        Klasa
                    </th>
                    <th>
                        Nazwa
                    </th>
                    <th>
                        Kraj
                    </th>
                    <th>
                        Rocznik
                    </th>
                    <th>Rodowod</th>
                </tr>
                <tr>
                    <th>
                        <input v-model.number="kon.numer" type="number">
                    </th>
                    <th>
                        <select v-model.number="kon.klasa">
                            <option v-for="k in klasy" :key="k.$loki" :value="k.$loki">{{k.numer}} {{k.kat}}</option>
                        </select>
                    </th>
                    <th>
                        <input v-model="kon.nazwa">
                    </th>
                    <th>
                        <input v-model="kon.kraj">
                    </th>
                    <th>
                        <input v-model.number="kon.rocznik" type="number">
                    </th>
                    <th>
                        ojciec(nazwa-kraj)<br>
                        <input v-model="kon.rodowod.o.nazwa" type="text">
                        <input v-model="kon.rodowod.o.kraj" type="text">
                    </th>
                </tr>
                <tr>
                    <th>
                        Masc
                    </th>
                    <th>
                        Plec
                    </th>
                    <th>
                        Hodowca
                    </th>
                    <th>
                        Wlasciciel
                    </th>
                    <th></th>
                    <th>
                        Matka(nazwa-kraj)<br>
                        <input v-model="kon.rodowod.m.nazwa" type="text">
                        <input v-model="kon.rodowod.m.kraj" type="text">
                    </th>
                </tr>
                <tr>
                    <th>
                        <input v-model="kon.masc">
                    </th>
                    <th>
                        <input v-model="kon.plec">
                    </th>
                    <th>
                        Nazwa<br><input v-model="kon.hodowca.nazwa" type="text"><br>
                        Kraj<br><input v-model="kon.hodowca.kraj" type="text">
                    </th>
                    <th>
                        Nazwa<br><input v-model="kon.wlasciciel.nazwa" type="text"><br>
                        Kraj<br><input v-model="kon.wlasciciel.kraj" type="text">
                    </th>
                    <th>
                    </th>
                    <th>
                        Ojciec-Matka(nazwa-kraj)<br>
                        <input v-model="kon.rodowod.om.nazwa" type="text">
                        <input v-model="kon.rodowod.om.kraj" type="text">
                    </th>
                </tr>
            </thead>
        </table>
        <button @click="dodaj">Dodaj</button>
        <button @click="zamknij" style="background-color:red">Cofnij</button>
    </div>
</template>
<script>
    export default {
        name: "DodajKon",

        data: function () {
            return {
                kon: {
                    numer: null,
                    klasa: null,
                    nazwa: null,
                    kraj: null,
                    rocznik: null,
                    masc: null,
                    plec: null,
                    hodowca: {
                        nazwa: null,
                        kraj: null
                    },
                    wlasciciel: {
                        nazwa: null,
                        kraj: null
                    },
                    rodowod: {
                        o: {
                            nazwa: null,
                            kraj: null
                        },
                        m: {
                            nazwa: null,
                            kraj: null
                        },
                        om: {
                            nazwa: null,
                            kraj: null
                        }
                    }
                }
            };
        },

        computed: {
            klasy () {
                return this.$store.getters.pobierzKlasy;
            }
        },

        methods: {
            dodaj () {
                this.$store.dispatch("dodaj", {
                    sciezka: "admin/konie",
                    obiekt: this.kon,
                    tabela: "Konie"
                });
                this.$emit("zamknijDodaj");
            },
            zamknij () {
                this.$emit("zamknijDodaj");
            }
        }
    };
</script>

<style scoped lang="less">
table {
    width:99%;
}
button{
    margin:auto;
    margin-top: 15px;
    display:block;
    font-size:18px;
    border: none;
    color: black;
    border-radius: 4px;
    text-decoration: none;
    background-color:green;
}
button:hover{
    cursor: pointer;
    color:black;
}
</style>
