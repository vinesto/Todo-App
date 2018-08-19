Vue.component('navbar', {
    template:
        `
    <nav class="navbar is-mobile is-link is-transparent-top is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <!-- navbar items, navbar burger... -->
                <a class="navbar-item">
                    <i class="fas fa-book" style="font-size:37px; margin-right:10px; color:#363636"></i>
                    <h1 class="title">Todo Web</h1>
                </a>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <!-- navbar items, navbar burger... -->
            <div class="navbar-menu">

                <!-- navbar start, navbar end -->
                <div class="navbar-start">
                    <a class="navbar-item">
                        Home
                    </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            About
                        </a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                Offline Store
                            </a>
                            <a class="navbar-item">
                                Contact Us
                            </a>
                            <hr class="navbar-divider">
                            <!-- <div class="navbar-item">
                            Version 0.7.1
                        </div> -->
                        </div>
                    </div>
                    <!-- navbar items -->
                </div>

                <div class="navbar-end is-mobile">
                    <!-- navbar items -->
                    <a class="navbar-item" href="http://localhost:8080/index.html" @click="logoutComp">
                        Logout
                    </a>
                    <!-- navbar items -->
                </div>
                <!-- navbar start, navbar end -->
            </div>
        </nav>
    `,
    methods:{
        logoutComp:function(){
            this.$emit("logout-func")
        }
    }
})
