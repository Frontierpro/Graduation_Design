<template>
    <div>
        <div class='spinner'>
            <div class='rect leftLeft'></div>
            <div class='rect leftMiddle'></div>
            <div class='rect leftRight'></div>
            <div class='rect middleLeftLeft'></div>
            <div class='rect middleLeftRight'></div>
            <div class='rect middleRightLeft'></div>
            <div class='rect middleRightRight'></div>
            <div class='rect rightLeft'></div>
            <div class='rect rightMiddle'></div>
            <div class='rect rightRight'></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadBar'
}
</script>

<style scoped>
.spinner {
    height: 30px;
    width: 66px;
    margin-top: 94.5px;
    margin-left: 117px;
    background-color: #2e2e2e;
    opacity: 0.85;
    border-radius: 2px;
}

.rect {
    position: absolute;
    background-color: coral;
    width: 4px;
    height: 20px;
    margin-top: 5px;
    -webkit-animation: stretchDelay 1.0s infinite ease-in-out;
    animation: stretchDelay 1.0s infinite ease-in-out;
}

.leftLeft {
    margin-left: 4px;
}

.leftMiddle {
    margin-left: 10px;
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.leftRight {
    margin-left: 16px;
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

.middleLeftLeft {
    margin-left: 22px;
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
}

.middleLeftRight {
    margin-left: 28px;
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
}

.middleRightLeft {
    margin-left: 34px;
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
}

.middleRightRight {
    margin-left: 40px;
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
}

.rightLeft {
    margin-left: 46px;
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
}

.rightMiddle {
    margin-left: 52px;
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
}

.rightRight {
    margin-left: 58px;
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
}

@-webkit-keyframes stretchDelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.6) } 
    20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchDelay {
    0%, 40%, 100% {
        transform: scaleY(0.6);
        -webkit-transform: scaleY(0.6);
    } 20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
    }
}
</style>
