<template>
    <main
        class="glass"
        :class="{
            'white-theme-main': !isDarkMode,
            'dark-theme-main': isDarkMode,
        }"
    >
        <div
            class="btn-wrapper"
            :class="{
                'white-theme-btn': !isDarkMode,
                'dark-theme-btn': isDarkMode,
            }"
        >
            <div @click="toggleStyle" class="btn">o</div>
            <div @click="minimizeWindow" class="btn">x</div>
        </div>
        <div class="plans" @dblclick="addPlan">
            <div v-for="(plan, index) in plans" :key="index" class="plan">
                <input
                    class="glass"
                    v-model="plan.text"
                    @keyup.enter="addNewPlan(index)"
                    @blur="savePlan"
                    @contextmenu.prevent="removePlan(index)"
                    placeholder="new"
                    :class="{
                        'white-theme-input': !isDarkMode,
                        'dark-theme-input': isDarkMode,
                    }"
                />
            </div>
        </div>
    </main>
</template>
<script>
export default {
    data() {
        return {
            plans: [{ text: "" }],
            isDarkMode: false,
        };
    },
    methods: {
        addPlan() {
            this.plans.push({ text: "" });
        },
        addNewPlan(index) {
            if (index === this.plans.length - 1) {
                this.addPlan();
            }
        },
        removePlan(index) {
            this.plans.splice(index, 1);
            if (this.plans.length === 0) {
                this.addPlan();
            }
        },
        minimizeWindow() {
            window.electron.minimize();
        },
        closeWindow() {
            window.electron.close();
        },
        toggleStyle() {
            this.isDarkMode = !this.isDarkMode;
        },
    },
};
</script>

<style lang="scss" scoped>
:root {
    --main-bg-opacity: 0.5;
    --text-bg-opacity: 0.9;
}
main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100vw;
    height: 100vh;
    -webkit-app-region: drag;
    overflow-x: hidden;
    .plans {
        width: 100%;
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        -webkit-app-region: no-drag;
        .plan {
            margin-bottom: 1em;
            display: flex;
            align-items: center;
            width: 100%;
            input {
                padding: 0 1em;
                width: 100%;
            }
        }
    }
    .btn-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5em;
        font-size: 1.5em;
        cursor: pointer;
        .btn {
            -webkit-app-region: no-drag;
        }
    }
}
.glass {
    backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07);
}

.white-theme-main {
    /*
    24.03.28 QH
        A strange problem occured here. If I write 'var(--main-bg-opacity)', it do not work.
    */
    background: rgba(0, 0, 0, 0.5);
}

.dark-theme-main {
    background: rgba(255, 255, 255, 0.5);
}

.white-theme-btn {
    background: rgba(255, 255, 255, var(--main-bg-opacity));
    color: #fff;
}
.white-theme-input {
    background: rgba(0, 0, 0, var(--text-bg-opacity));
    color: #fff;
}

.dark-theme-btn {
    background: rgba(255, 255, 255, var(--main-bg-opacity));
    color: #000;
}
.dark-theme-input {
    background: rgba(0, 0, 0, var(--text-bg-opacity));
    color: #000;
}

::-webkit-scrollbar {
    width: 0.5em;
}

::-webkit-scrollbar-track {
    background: rgba($color: #fff, $alpha: 0.1);
}

::-webkit-scrollbar-thumb {
    background: transparent;
    box-shadow: 0px 0px 0px 100vh rgba($color: #000, $alpha: 0.5);
    border-radius: 14px;
}
</style>
