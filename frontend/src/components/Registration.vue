<template>
    <div class="vue-template">
        <form>
            <h3>Sign Up</h3>
 
            <div class="form-group">
                <label>username</label>
                <input type="text" id="username" class="form-control form-control-lg"/>
            </div>
 
            <div class="form-group">
                <label>Email address</label>
                <input type="email" id="email" class="form-control form-control-lg" />
            </div>
 
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="password" class="form-control form-control-lg" />
            </div>
 
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
            <!--- <button @click="emitCustomEvent">Emit Event</button> -->
 
            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
        </form>
    </div>
</template>
 
<script>
    export default {
        data() {
            return {}
        }
        methods: {
        emitCustomEvent() {
            this.$emit('custom-event-name', { message: 'Mon message personnalisé' })
        }
    }
    }


</script>