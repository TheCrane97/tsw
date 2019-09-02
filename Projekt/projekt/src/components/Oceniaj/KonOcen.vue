<template>
    <div id="ocen">
        <table v-if="kon">
            <tr>
                <th>Typ</th>
                <th>Glowa</th>
                <th>Kloda</th>
                <th>Nogi</th>
                <th>Ruch</th>
            </tr>
            <tr v-for="(nota,index) in kon.wynik.noty" :key="index">
                <td>
                    <input
                        type="number"
                        max="20"
                        min="0"
                        step="0.5"
                        :tabindex="(index+1)+(kon.wynik.noty.length*(0))"
                        v-model.number="nota.typ"
                    >
                </td>
                <td>
                    <input
                        type="number"
                        max="20"
                        min="0"
                        step="0.5"
                        :tabindex="(index+1)+(kon.wynik.noty.length*(1))"
                        v-model.number="nota.glowa"
                    >
                </td>
                <td>
                    <input
                        type="number"
                        max="20"
                        min="0"
                        step="0.5"
                        :tabindex="(index+1)+(kon.wynik.noty.length*(2))"
                        v-model.number="nota.kloda"
                    >
                </td>
                <td>
                    <input
                        type="number"
                        max="20"
                        min="0"
                        step="0.5"
                        :tabindex="(index+1)+(kon.wynik.noty.length*(3))"
                        v-model.number="nota.nogi"
                    >
                </td>
                <td>
                    <input
                        type="number"
                        max="20"
                        min="0"
                        step="0.5"
                        :tabindex="(index+1)+(kon.wynik.noty.length*(4))"
                        v-model.number="nota.ruch"
                    >
                </td>
            </tr>
        </table>
        <div id="centruj">
            <button class="srodek" @click="ocen">Ocen</button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "KonOceniaj",
        data: function () {
            return {};
        },
        methods: {
            ocen () {
                this.kon.oceniono = true;
                this.$store.dispatch("edytuj", {
                    sciezka: "admin/konie",
                    obiekt: this.kon,
                    tabela: "Konie"
                });
            }
        },
        props: {
            kon: Object
        }
    };
</script>

<style lang="less">
</style>
