<script lang="ts">
    import Figure from "$lib/components/blog/Figure.svelte";
    import Ref from "$lib/components/blog/Ref.svelte";
    import Latex from "$lib/components/blog/Latex.svelte";
</script>
  
<p>
    Welcome to my new blog! I've decided to move away from <b>hashnode</b> as 
    I found writing articles to be rather limiting. 
    
    This website is instead built with <a href="https://kit.svelte.dev/">SvelteKit</a>, 
    which is probably my favorite JavaScript web framework at the moment,
    and hosted on <a href="https://pages.github.com/">GitHub Pages</a>.

    If you want to access the old posts, they can still be found on my old <a href="https://blog.sackarias.se/">hashnode blog</a>.
</p>

<br/>
<br/>

<h2>Introduction</h2>

<br/>

<p>
    Recently, I've been undergoing an exchange semester at TU Delft, and I've really taken a liking 
    to the course <i>Deep Reinforcement Learning (CS4400)</i>. One of the first assignments was to
    implement a Reinforcement Learning (RL) Agent that could balance the 
    <a href="https://gymnasium.farama.org/environments/classic_control/cart_pole/">Cart-Pole</a>. 
    Naturally, I thought about applying RL to my own 
    <a href="https://blog.sackarias.se/series/cart-pole">Cart-Pole project</a>.
    To reach that future goal, I'm writing this article on how to implement a simple <b>Deep Q-Learning Agent</b>,
    as a launch pad for future RL endeavours. 
</p>

<br/>

<p>
    <b>As a disclaimer</b>, I'm still very much a learner when it comes to RL, and this article will not be satisfactory
    in explaining every concept. I can however tell you useful details that I know, and direct you to other
    resources for further reading. Moreover, I will provide you with some basic code that you use in furthering
    your RL training. I will also assume that you have elementary knowledge in probability theory, linear algebra, 
    deep learning, and <a href="https://pytorch.org/docs/stable/index.html">PyTorch</a>.
</p>

<br/>
<br/>

<h2>Background</h2>

<br/>

<p>
    So, what is <a href="https://en.wikipedia.org/wiki/Reinforcement_learning">Reinforcement Learning</a>?
    In short, its a branch of machine learning
    that deals with an <i>agent</i> that interacts with an <i>environment</i>. The agent can take <i>actions</i> to interact
    with the environment, for which it receives <i>rewards</i>. The goal of the agent is to learn a
    <i>policy</i>, i.e. which actions to take in certain situations or <i>states</i>, that yield the highest reward.
<p>

<Figure
    ref="fig_simple_mdp"
    src="simple_mdp.gif"
    text="Robot in a grid world that follows a policy towards the apple and away from the worm."
/>

<p>
    An example of an RL agent would be a robot that traverses a grid world (<Ref ref="fig_simple_mdp"/>). The robot can be in different squares 
    on the grid and it can move left, right, up or down;
    these are its states and actions. One state might have an apple and if the robot moves there, it receives a
    positive reward. Another state might have a worm which has a negative reward. The optimal policy that the agent learns
    would then try to go to the apple as fast as possible while avoiding the worm.
</p>

<br/>

<p>
    Let's go through a few important concepts in RL. Firstly, the environment is often
    modelled as a <a href="https://en.wikipedia.org/wiki/Markov_decision_process">Markov decision process (MDP)</a>,
    which is described as a 5-tuple <Latex math={"\\mathcal{M}"}/>:
</p>

<br/>

<Latex displayMode math={`
    \\mathcal{M} := \\langle \\mathcal{S}, A, \\rho, P, R \\rangle
`}/>

<ul>
    <li><Latex math={"s \\in \\mathcal{S}"}/> 
        - the set of all possible states of the environment. 
        This could be, for instance, the position of the robot, its orientation, its mood, etc.
        A lowercase <Latex math={"s"}/> denotes a specific action drawn from <Latex math={"\\mathcal{S}"}/>. 
    </li>
    <li><Latex math={"a \\in \\mathcal{A}"}/>  
        - the set of all actions that the agent can take, for instance to move right, left, jump, and so on. 
        A lowercase <Latex math={"a"}/> denotes a specific action drawn from <Latex math={"\\mathcal{A}"}/>. 
    </li>
    <li><Latex math={"\\mathcal{\\rho(s_0)}"}/> 
     - the initial state distribution that assigns a probability of starting in a specific state.
    Often, an environment has a specific initial state denoted as <Latex math={"s_0"}/>.
    </li>
    <li><Latex math={"P(s'|s,a)"}/> 
     - the transition model that assigns a probability of transitioning to a new state 
    <Latex math={"s'"}/> given that the agent takes action <Latex math={"a"}/> 
    in state <Latex math={"s"}/>.
    </li>
    <li><Latex math={"R(r|s,a,s')"}/> 
        - the reward distribution that assigns a reward <Latex math={"r"}/> 
       when the agent moves from state <Latex math={"s"}/> to <Latex math={"s'"}/>
       using action <Latex math={"a"}/>.
    </li>
</ul>

<br/>

<p>
    Notice that the MDP is very much stochastic. Due to the transition model, taking an action
    to move left might not always result in the agent <i>actually</i> moving left. The robot
    could slip, fall down a cliff or get hit by lightning; there is (almost) always some uncertainty. 
    This makes MDPs very powerful in that they can be used to model environments that humans
    can't fully describe.
</p>

<br/>

<p>
    Continuing, a <i>policy</i>, denoted as <Latex math={"\\pi(a|s)"}/>, describes the probability that 
    the agent takes action <Latex math={"a"}/> in state <Latex math={"s"}/>. The <i>state value function</i>
    <Latex math={"V^\\pi(s)"}/> is the expected future discounted reward that the agent receives when following
    policy <Latex math={"\\pi"}/>, starting from state <Latex math={"s"}/>. When I say discounted, I mean that
    immediate rewards are more valuable than future ones. The value function can be written as
    <Latex math={"V^\\pi(s) = \\mathbb{E}_\\pi\\left[\\sum_{t=0}^\\infty \\gamma^t r_t \\mid s_0 = s\\right]"}/> 
    where <Latex math={"\\gamma \\in (0, 1]"}/> is the discount factor that gets smaller and smaller for each
    action that is taken. More importantly, there is the <i>state-action value function</i> 
    <Latex math={"Q^\\pi(s,a)"}/> which is the expected future discounted reward when following <Latex math={"\\pi"}/> and starting 
    in state <Latex math={"s"}/> and taking action <Latex math={"a"}/>. It can be written as
    <Latex math={"Q^\\pi(s,a) = \\mathbb{E}_\\pi\\left[\\sum_{t=0}^\\infty \\gamma^t r_t \\mid \\begin{smallmatrix} s_0 = s \\\\ a_0 = a \\end{smallmatrix} \\right]"}/>.
</p>

<br/>

<p>
    So, what is the difference between <Latex math={"V^\\pi(s)"}/> and <Latex math={"Q^\\pi(s,a)"}/>? The state value
    function <Latex math={"V^\\pi(s)"}/> describes how good it is to be in a specific state, whilst
    the state-action value function <Latex math={"Q^\\pi(s,a)"}/>, or <i>Q-value</i> function, describes how good it is to take
    a specific action in a specific state. This allows <Latex math={"Q^\\pi(s,a)"}/> to be used to
    compare different actions, which is used extensively in <i>Q-learning</i>, where the agent choses
    the action that maximizes the <i>Q-value</i> in a given state. The optimal action can be written as
    <Latex math={"a^* = \\argmax_{a' \\in \\mathcal{A}} Q^\\pi(s,a')"}/> and always chosing the optimal action
    yields an optimal Q-value function <Latex math={"Q^*(s,a)"}/>.
</p>

<br/>

<p>
    In the early days of RL, <Latex math={"\\pi(a|s)"} />, <Latex math={"V^\\pi(s)"}/> and 
    <Latex math={"Q^\\pi(s,a)"}/> were often used in tabular form. This means that to 
    get the Q-value of an action and state, you would have to look up the value
    in a cell in a table. It also meant that updating the table could only be done one cell
    at a time.
    This works well for small and <i>discrete</i> state-spaces, but
    highly impractical for larger systems. If we want to apply RL to systems other than
    toy examples, we need functions that can generalize. This is where <i>function approximation</i>
    comes into the picture.
</p>

<br/>

<p>
    One of the most popular function approximators, that have taken the world by storm over the
    last decade, are <a href="https://en.wikipedia.org/wiki/Artificial_neural_network">artificial neural networks</a>. 
    I assume that you already are familiar with neural networks; If not, this article won't make
    a lot of sense henceforth, so be warned. The usage of neural networks in RL have given rise
    to agents like <a href="https://en.wikipedia.org/wiki/AlphaGo">AlphaGo</a>, which beat the number one
    ranked Go player in the world, and is used to fine-tune <a href="https://openai.com/blog/chatgpt">ChatGPT</a>
    using human feedback. 
</p>

<br/>

<p>
    I found <i>Deep RL</i> challenging to get into; The field is constantly evolving, and there is no
    single algorithm or equation that is used. There are a ton of little tricks and hacks that are needed
    to make an RL agent actually work, and I want to share what I've learnt to far, starting with arguably
    the simplest Deep RL agent there is: the <i>Deep Q-learning</i> agent.
</p>

<br/>
<br/>

<h2>Deep Q-Learning</h2>

<br/>

<p>
    Deep Q-learning 
</p>