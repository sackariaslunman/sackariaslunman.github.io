export interface Article {
    title: string;
    description: string;
    slug: string | undefined;
    external: boolean;
    href: string | undefined;
    thumbnail: string;
    tags: string[];
    use_pyscript: boolean;
}

export function getArticles(): Article[] {
    return [
        {
            title: "A simple Deep Q-Learning Agent from scratch using PyTorch",
            description: "A brief introduction of Deep Q-Learning Networks and how to implement them from scratch using PyTorch.",
            slug: "simple-dqn",
            external: false,
            href: "",
            thumbnail: "swing-up-inverted-pendulum.avif",
            tags: ["PyTorch", "Deep Learning", "Reinforcement Learning", "DQN", "Python"],
            use_pyscript: false,
        },
        {
            title: "Swing-Up of an Inverted Pendulum on a Cart",
            description: "In this article, I will show you some recent progress of our first successful swing-up of our physical Cart-Pole model.",
            slug: "",
            external: true,
            href: "https://blog.sackarias.se/swing-up-of-an-inverted-pendulum-on-a-cart",
            thumbnail: "swing-up-inverted-pendulum.avif",
            tags: ["LQR", "trajectory-planning", "controllers"],
            use_pyscript: false,
        },
        {
            title: "Fast Optimization using CasADi with Opti",
            description: "In this article, fast nonlinear optimization is performed using the Opti-stack provided by CasADi to solve a trajectory planning problem.",
            slug: "",
            external: true,
            href: "https://blog.sackarias.se/fast-optimization-using-casadi-with-opti",
            thumbnail: "fast-optimization-using-casadi.avif",
            tags: ["optimization", "Python", "casadi", "linearization", "opti-stack"],
            use_pyscript: false,
        },
        {
            title: "Trajectory Stabilization using LQR",
            description: "Implementation of a trajectory stabilization controller using LQR.",
            slug: "",
            external: true,
            href: "https://blog.sackarias.se/trajectory-stabilization-using-lqr",
            thumbnail: "trajectory-stabilization-using-lqr.avif",
            tags: ["Python", "numpy", "scipy", "LQR", "sympy"],
            use_pyscript: false,
        },
        {
            title: "Building an Electric Vehicle",
            description: "Building a small Electric Vehicle for the Chalmers Cortège.",
            slug: "",
            external: true,
            href: "https://blog.sackarias.se/building-an-electric-vehicle",
            thumbnail: "building-an-electric-vehicle.jpg",
            tags: ["Electronics", "microcontroller", "arduino", "Electric Vehicle", "C++"],
            use_pyscript: false,
        },
        {
            title: "Trajectory Optimization using Direct Collocation",
            description: "Implementation of a simple trajectory optimization solver using direct collocation.",
            slug: "",
            external: true,
            href: "https://blog.sackarias.se/trajectory-optimization-using-direct-collocation",
            thumbnail: "trajectory-optimization-using-direct-collocation.avif",
            tags: ["optimization", "LQR", "trajectory-planning", "direct-collocation", "direct transcription"],
            use_pyscript: false,
        },
        {
            title: "Controlling the Cart-Pole using LQR",
            description: "Implementation of a Linear Quadratic Regulator (LQR) to control the Cart-Pole system.",
            slug: "",
            external: true,
            href: "https://blog.sackarias.se/controlling-the-cart-pole-using-lqr",
            thumbnail: "controlling-the-cartpole-using-lqr.avif",
            tags: ["Python", "pygame", "simulation", "simulation", "controllers"],
            use_pyscript: false,
        },
        {
            title: "Making a Cart-Pole test environment",
            description: "Making a Cart-Pole test environment using RK4 integration and OpenAI's gym package.",
            slug: "",
            external: true,
            href: "https://blog.sackarias.se/making-a-cart-pole-test-environment",
            thumbnail: "making-cart-pole-test-environment.jpg",
            tags: ["Python", "openai", "numpy", "pygame"],
            use_pyscript: false,
        },
        {
            title: "Modeling and simulating a Cart-Pole system",
            description: "Modeling an inverted pendulum on a cart system and simulating it in Python with PyGame.",
            slug: "",
            external: true,
            href: "https://blog.sackarias.se/modeling-and-simulating-a-cart-pole-system",
            thumbnail: "modelling-and-simulating-cart-pole-system.avif",
            tags: ["simulator", "pygame", "Python"],
            use_pyscript: false,
        }
    ]
}

export function getArticle(path: string): Article | undefined {
    const articles = getArticles();
    let index = path.lastIndexOf('/') + 1;
    if (index === -1) {
        index = 0;
    }
    const slug = path.substring(index);
    const article = articles.find((article) => article.slug === slug);
    return article;
}