<template>
    <div class="banner">
        <div class="row">
            <!--<h4 class="offset-md-1 col-md-10">Welcome To The</h4>-->
            <!--<div class="offset-md-1 col-md-10">--><img src="../assets/logo1.png" alt="Benchmark logo" class="src"><!--</div>-->
            <!--<div class="offset-md-1 col-md-10 text"><h1>Planroom</h1></div>-->
        </div>
    </div>
</template>
<style scoped>
img {
    width: auto;
    display: block;
    height: auto;
    margin: auto;
    max-width: 90%;
    max-height: 80%;
    min-height: 75%;
}
.row {
    width: 100%;
    height: 100%;
}
h1 {
    font-weight: 600;
    font-size: 5.2vw;
    text-align: center;
    color: goldenrod;
    font-style: italic;
    font-family: Georgia, 'Times New Roman', Times, serif;
    padding-top: 15px;

}
h4 {
    font-weight: 600;
    font-size: 4.0vw;
    color: goldenrod;
    font-style: italic;
    font-family: Georgia, 'Times New Roman', Times, serif;
    text-align: center;
    padding-bottom: 15px;
}
.text {
    display: flex;
    justify-content: center;
    align-items: center;
}

.banner {
    background: url(../assets/piping.jpg);
    background-size: cover;
    width: 100%;
    padding-top: 25px;
    padding-bottom: 25px;
    height: 400px;
    position: fixed;
    top: 50px;
}
</style>
