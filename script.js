/**
 * Pasión en Pareja - Game Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial UI Setup
    lucide.createIcons();

    // Particle Generation
    const createParticles = () => {
        const container = document.getElementById('particles');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.setProperty('--d', `${5 + Math.random() * 10}s`);
            p.style.left = `${Math.random() * 100}%`;
            p.style.delay = `${Math.random() * 5}s`;
            p.style.transform = `scale(${0.5 + Math.random()})`;
            container.appendChild(p);
        }
    };
    createParticles();

    const contentArea = document.getElementById('content');
    const mainNav = document.getElementById('main-nav');

    // Navigation Listener
    mainNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-btn');
        if (btn && btn.dataset.view) {
            renderView(btn.dataset.view);
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    });

    // Game State
    const state = {
        currentView: 'home',
        isRolling: false
    };

    // --- Content Data ---
    const data = {
        positions: [
            {
                name: "Bandolera",
                desc: "Una posición de gran intensidad donde la mujer se tumba de espaldas y eleva las rodillas hacia su pecho, permitiendo que el hombre se arrodille frente a ella. Ella apoya sus pies firmemente en el pecho de él para ganar estabilidad, mientras él coloca sus antebrazos sobre las rodillas de ella, ejerciendo una presión descendente que abre camino a una penetración excepcionalmente profunda y placentera para ambos.",
                img: "img/ic_bandoleer.png"
            },
            {
                name: "El Puente",
                desc: "Reservada para los más audaces y en buena forma física. El hombre forma un puente con su cuerpo apoyando manos y pies, mientras la mujer se sienta sobre su pelvis. Ella tiene el control total del movimiento, subiendo y bajando mientras se impulsa con sus propios pies desde el suelo. Es una danza de equilibrio que ofrece un ángulo visual y sensorial único.",
                img: "img/ic_bridge.png"
            },
            {
                name: "El Agarre",
                desc: "Una evolución del misionero diseñada para el placer máximo. La mujer se tumba de espaldas, idealmente con un cojín bajo las nalgas para inclinar la pelvis. El hombre se sitúa entre sus piernas mientras ella, con un movimiento hipnótico de lado a lado, busca el ángulo perfecto de fricción. Es una posición que requiere sincronización y permite un contacto piel con piel absoluto.",
                img: "img/ic_grip.png"
            },
            {
                name: "Delicia de la Tarde",
                desc: "La comodidad se une a la pasión en esta postura lateral. El hombre se tumba de lado mientras la mujer se sitúa de espaldas a él, pero girada en ángulo recto. Ella coloca sus rodillas sobre la cadera de él, creando un acceso cómodo y natural que permite una penetración relajada pero muy estimulante, ideal para una sesión larga y sin prisas.",
                img: "img/ic_afternoon_delight.png"
            },
            {
                name: "El Jinete",
                desc: "Una variante poderosa de la vaquera invertida. La mujer se sienta sobre el hombre mirando hacia sus pies, inclinando su torso hacia adelante para buscar equilibrio sobre las rodillas de él mientras se desliza con ritmo. El hombre, con sus manos libres, puede sujetar la cintura de ella para ayudar a marcar el compás y la profundidad, disfrutando de una vista espectacular.",
                img: "img/ic_rider.png"
            },
            {
                name: "El Visitante",
                desc: "Perfecta para esos momentos donde la pasión no puede esperar. Ambos se mantienen de pie, frente a frente, en una conexión eléctrica. Antes de la unión total, el hombre utiliza su cuerpo para estimular suavemente las zonas más sensibles de ella. Es una postura que derrocha adrenalina y cercanía, ideal para cualquier lugar donde la privacidad lo permita.",
                img: "img/ic_visitor.png"
            },
            {
                name: "Deslizamiento",
                desc: "La sencillez hecha placer. El hombre se tumba completamente plano y relajado, permitiendo que la mujer se deslice sobre él con sus piernas juntas. Al mantener las piernas cerradas, la sensación de estrechez aumenta considerablemente, mientras ella sube y baja rítmicamente sobre su cuerpo. Es una posición con poco esfuerzo físico pero con una carga sensorial muy alta.",
                img: "img/ic_slide.png"
            },
            {
                name: "El Broche",
                desc: "Una demostración de fuerza y entrega. El hombre permanece de pie y sostiene a la mujer, quien envuelve sus piernas firmemente alrededor de su cintura. Él utiliza sus brazos para soportar el peso de ella, permitiendo un movimiento suspendido que desafía la gravedad. Para mayor estabilidad, ella puede apoyar su espalda contra una pared, permitiendo empujes más decididos.",
                img: "img/ic_clasp.png"
            },
            {
                name: "Tominagi",
                desc: "Una joya del Kamasutra para la profundidad. El hombre se arrodilla mientras la mujer, tumbada de espaldas, apoya sus pies con fuerza contra el pecho de él. Esta configuración permite al hombre un control milimétrico del ángulo y la potencia de cada empuje. Es especialmente efectiva para maximizar la sensación en cada contacto, llevando el placer a un nivel muy íntimo.",
                img: "img/ic_tominagi.png"
            },
            {
                name: "Pelota Sentada",
                desc: "Un juego de equilibrio y balanceo. La mujer se sitúa sobre el regazo del hombre en una posición de cuclillas extrema. Ella controla el ritmo balanceándose sobre sus talones hacia adelante y hacia atrás, permitiendo que la gravedad y su propio peso dicten la intensidad del contacto. Es una posición activa que invita a una conexión visual y física muy potente.",
                img: "img/ic_seated_ball.png"
            },
            {
                name: "Ángel Enroscado",
                desc: "La máxima expresión de la ternura apasionada. Ambos se acuestan de lado en la misma dirección, pero la mujer encoge sus piernas hacia el pecho en posición fetal. El hombre la abraza por detrás, encajando sus cuerpos como piezas de un puzzle. Es ideal para sesiones perezosas por la mañana o cuando el cansancio invita a un placer pausado, suave y muy reconfortante.",
                img: "img/ic_curled_angel.png"
            },
            {
                name: "Enebro Brillante",
                desc: "Diseñada para la relajación total de ella. La mujer se tumba de espaldas con las rodillas dobladas y las piernas abiertas, mientras el hombre se sienta entre ellas con sus piernas extendidas. Él utiliza sus manos para elevar ligeramente las caderas de ella, facilitando un ángulo de entrada suave y fluido. Es una postura que permite a la mujer abandonarse por completo al placer.",
                img: "img/ic_glowing_juniper.png"
            },
            {
                name: "La Cruz",
                desc: "Un contraste de ángulos fascinante. La mujer se tumba de espaldas extendiendo una de sus piernas mientras eleva la otra, doblándola ligeramente. El hombre se sitúa sobre la pierna extendida y sujeta la pierna elevada para estabilizar el movimiento y controlar la profundidad. Es una posición asimétrica que ofrece sensaciones nuevas a cada lado del cuerpo.",
                img: "img/ic_cross.png"
            },
            {
                name: "La Percha",
                desc: "Ideal para usar una silla o el borde de la cama. El hombre se sienta y la mujer se acomoda en su regazo dándole la espalda. Ella tiene el control del movimiento apoyándose en sus pies, mientras el hombre tiene sus manos libres para explorar el pecho y el clítoris de ella, creando una estimulación múltiple y muy coordinada.",
                img: "img/ic_perch.png"
            },
            {
                name: "El Arado",
                desc: "Una posición audaz con un ángulo inmejorable. La mujer se sitúa en el borde de la cama apoyándose sobre sus codos mientras sus piernas cuelgan hacia el suelo. El hombre, de pie frente a ella, eleva las caderas y muslos de ella para facilitar la unión. Permite una visión clara y un control total de la profundidad por parte del hombre.",
                img: "img/ic_plough.png"
            },
            {
                name: "El Sapo",
                desc: "Intimidad frontal en estado puro. Ambos se tumban frente a frente; ella abre sus piernas permitiendo que él se sitúe entre ellas. Para intensificar el contacto, ella puede envolver sus piernas alrededor de la cintura de él, presionando con sus pies en las nalgas de su pareja para controlar la presión de la fricción mutua.",
                img: "img/ic_toad.png"
            },
            {
                name: "El Héroe",
                desc: "Enfocada en la profundidad visual y física. La mujer se tumba de espaldas con las rodillas pegadas al pecho y los pies apuntando al techo. El hombre se arrodilla y desliza sus muslos bajo las nalgas de ella para elevar su pelvis. Esta elevación crea un camino directo y profundo, permitiendo que cuerpo y alma se sincronicen en el movimiento.",
                img: "img/ic_hero.png"
            },
            {
                name: "La Clavija",
                desc: "De lado y entrelazados. El hombre se tumba de costado mientras la mujer se acurruca mirando hacia los pies de él, envolviendo sus piernas con las de su pareja. Es una configuración inusual pero muy firme, donde los cuerpos quedan 'clavados' el uno al otro, permitiendo un movimiento corto pero muy intenso y vibrante.",
                img: "img/ic_peg.png"
            },
            {
                name: "Clásica",
                desc: "La versión perfeccionada del misionero tradicional. Al colocar un cojín firme bajo las nalgas de ella, se logra una ligera inclinación de la pelvis que cambia por completo el ángulo de contacto. Permite una penetración más profunda y un roce constante con los puntos más sensibles, manteniendo el romanticismo y el contacto visual.",
                img: "img/ic_classic.png"
            },
            {
                name: "El Abanico",
                desc: "Atrévete con algo diferente. La mujer se inclina hacia adelante, cruzando sus brazos y apoyando sus codos sobre una silla para tener soporte estable. El hombre se sitúa detrás de ella para entrar desde esa perspectiva. Ofrece un control absoluto al hombre sobre el ritmo y permite una exploración visual y física muy estimulante de la espalda y glúteos.",
                img: "img/ic_fan.png"
            },
            {
                name: "Caracol",
                desc: "Una postura que requiere flexibilidad y ofrece una intensidad máxima. La mujer se tumba de espaldas y lleva sus rodillas hacia el pecho, apoyando sus pies sobre los hombros del hombre, quien se arrodilla frente a ella. Esta posición compacta el cuerpo de la mujer, reduciendo el espacio y permitiendo una penetración muy ajustada y profunda que ambos sentirán con gran nitidez.",
                img: "img/ic_snail.png"
            },
            {
                name: "Resbalón",
                desc: "Un juego de ángulos y apoyo. El hombre se arrodilla y se inclina hacia atrás, sosteniéndose con sus manos en el suelo tras de él, mientras la mujer se tumba de espaldas frente a él. Al elevar ella ligeramente sus caderas hacia su pareja, se crea un puente de placer donde el movimiento es fluido y constante, permitiendo una conexión rítmica muy placentera.",
                img: "img/ic_slip.png"
            },
            {
                name: "El Sabueso",
                desc: "Una variante más íntima y baja del estilo perrito. En lugar de apoyarse sobre sus manos, la mujer desciende hasta apoyar sus antebrazos en el suelo o la cama, bajando su centro de gravedad. Esto permite que el hombre se incline sobre su espalda para besar su cuello y hombros mientras la pareja se mueve rítmicamente. Es una posición que combina potencia y ternura.",
                img: "img/ic_hound.png"
            },
            {
                name: "Tigre agazapado",
                desc: "Pura adrenalina de espaldas. El hombre se sienta en el borde de la cama con sus pies colgando, mientras la mujer se sitúa sobre él de espaldas, en una posición de cuclillas. Ella tiene el control total de la profundidad y la velocidad, mientras el hombre disfruta de una perspectiva privilegiada de su espalda y de la libertad de acariciar sus muslos.",
                img: "img/ic_crouching_tiger.png"
            },
            {
                name: "Bisagra",
                desc: "Una prueba de equilibrio y sincronía arrodillados. El hombre se arrodilla detrás de la mujer y se inclina ligeramente hacia atrás, usando un brazo como soporte. Ella, también de rodillas, se apoya frontalmente sobre sus codos para estabilizarse. Juntos crean un movimiento de vaivén que es muy estimulante, permitiendo que el hombre use su mano libre para explorar el cuerpo de ella.",
                img: "img/ic_hinge.png"
            },
            {
                name: "El Barco",
                desc: "Relajación y control absoluto para la mujer. Mientras el hombre se tumba cómodamente de espaldas, ella se sienta sobre él con ambas piernas hacia un mismo lado, como si estuviera sentada de lado en un barco. Esta asimetría permite una fricción diferente y deliciosa, dándole a ella la libertad de marcar un ritmo pausado y profundo a su antojo.",
                img: "img/ic_ship.png"
            },
            {
                name: "Desde Atrás",
                desc: "La intensidad de la pasión de pie. El hombre se sitúa detrás de la mujer mientras ambos permanecen de pie. Para mayor comodidad y para poder ejercer más presión, ella puede apoyarse frontalmente contra una pared o un mueble firme. Es una posición que derrocha energía y permite una libertad de movimiento total para ambos, ideal para un encuentro fugaz e intenso.",
                img: "img/ic_from_behind.png"
            },
            {
                name: "Acto de Equilibrio",
                desc: "Una posición de cercanía extrema y apoyo mutuo. El hombre se tumba de espaldas con las piernas abiertas y la mujer se sienta entre ellas, acurrucándose en forma de bola. Él la sostiene con sus brazos, dándole seguridad y soporte, mientras ella se mueve suavemente. Las manos de ella quedan libres para su propio placer o para acariciar zonas sensibles de su pareja.",
                img: "img/ic_balancing_act.png"
            },
            {
                name: "Bambú partido",
                desc: "Una posición asimétrica muy sugerente. La mujer se tumba de espaldas mientras mantiene una pierna estirada sobre la cama y la otra elevada, apoyada sobre el hombro de su pareja. El hombre se sitúa sobre el muslo de la pierna estirada y sujeta la pierna elevada para equilibrar sus movimientos, permitiendo una entrada profunda y un contacto lateral muy estimulante.",
                img: "img/ic_splitting_bamboo.png"
            },
            {
                name: "La Rana",
                desc: "Dinámica y divertida en el borde de la cama. El hombre se sienta con los pies apoyados en el suelo y la mujer se sitúa sobre su regazo de cuclillas, imitando la posición de una rana. Ella se impulsa hacia arriba y abajo usando sus manos sobre los hombros o muslos de él para ganar estabilidad, manteniendo un control total del ritmo y la intensidad en todo momento.",
                img: "img/ic_frog.png"
            },
            {
                name: "La vela",
                desc: "Una postura vertical de gran impacto. La mujer se tumba de espaldas, eleva sus piernas hacia el techo y las mantiene rectas o ligeramente dobladas hacia su pecho, apoyándose sobre sus hombros (con un cojín bajo la cabeza para comodidad). El hombre se arrodilla entre sus piernas para una unión que ofrece una profundidad visual y física inmejorable.",
                img: "img/ic_candle.png"
            },
            {
                name: "Cesta",
                desc: "Intimidad acogedora sentados. El hombre se sienta en la cama con una pierna estirada y la otra doblada para apoyarse, creando una 'cesta' con sus piernas. La mujer se sienta en su regazo de frente, entrelazando sus cuerpos. Esta cercanía permite que el hombre acaricie y bese los pechos de ella fácilmente mientras ambos disfrutan de un ritmo suave y conectado.",
                img: "img/ic_basket.png"
            },
            {
                name: "Galería",
                desc: "Control frontal con estilo. El hombre se sienta apoyando su peso sobre un brazo, dejando el otro libre para acariciar, mientras extiende sus piernas. La mujer se sienta sobre él inclinándose hacia adelante, apoyando sus propias manos para ganar estabilidad. Desde esta galería de placer, ella dirige cada movimiento, decidiendo la profundidad a cada paso.",
                img: "img/ic_galley.png"
            },
            {
                name: "El Clip",
                desc: "Un ajuste perfecto para un placer intenso. El hombre se tumba boca arriba con las piernas juntas, mientras la mujer se sienta a horcajadas sobre él y se inclina hacia atrás, apoyándose en sus brazos. Al mantener las piernas de él cerradas, se crea una sensación de presión mutua deliciosa mientras ella se balancea rítmicamente, permitiendo que él se relaje y disfrute del espectáculo.",
                img: "img/ic_clip.png"
            },
            {
                name: "Susurro",
                desc: "La posición de los amantes silenciosos. Ambos se tumban de lado frente a frente; la mujer envuelve con sus piernas la cintura de él y cruza sus tobillos tras su espalda para 'bloquear' el contacto. Esta cercanía extrema permite besos constantes y palabras susurradas al oído, mientras el hombre realiza movimientos cortos y profundos llenos de ternura.",
                img: "img/ic_wisper.png"
            },
            {
                name: "Desafío",
                desc: "Atrévete con el equilibrio en las alturas. Utilizando una silla o taburete muy firme, la mujer se coloca en cuclillas sobre él mientras el hombre se sitúa detrás para entrar desde esa perspectiva. Él debe sujetar con firmeza la cintura de ella para garantizar la seguridad y el equilibrio, creando una dinámica de poder y confianza muy excitante y profunda.",
                img: "img/ic_challenge.png"
            },
            {
                name: "Arrodillados",
                desc: "Sencillez y conexión mutua. En esta posición, tanto el hombre como la mujer permanecen arrodillados frente a frente. Ella abre sus piernas lo suficiente para que él se sitúe entre ellas, permitiendo que ambos se rodeen con sus brazos. Es una postura que favorece el contacto visual y los besos apasionados mientras se mueven en una sincronía perfecta y natural.",
                img: "img/ic_kneel.png"
            },
            {
                name: "Carretilla arrodillada",
                desc: "Una versión accesible de la carretilla clásica. La mujer apoya una rodilla y un codo opuesto en la cama para estabilizarse, mientras extiende su otra pierna. El hombre se arrodilla detrás de ella y sostiene sus caderas para ayudar al equilibrio mientras entra rítmicamente. Es una posición asimétrica que ofrece una estimulación interna variada y muy placentera.",
                img: "img/ic_knelling_wheelbarrow.png"
            },
            {
                name: "La Araña",
                desc: "Sentados y entrelazados en una danza de manos. El hombre se sienta con las piernas estiradas y se inclina sobre sus manos hacia atrás; la mujer se sienta sobre él de frente imitando su postura. Al usar ambos sus manos atrás para balancearse hacia adelante y atrás, crean una fricción rítmica y juguetona que permite una cercanía física y visual muy sexy.",
                img: "img/ic_spider.png"
            },
            {
                name: "El Pliegue",
                desc: "Una postura diseñada para la profundidad y la comodidad. La mujer se tumba de espaldas y coloca un cojín firme bajo sus nalgas para elevar considerablemente sus caderas. Ella deja que sus piernas descansen relajadamente detrás de la espalda del hombre, quien se sienta entre sus muslos. Esta elevación y apertura permiten una penetración profunda con un esfuerzo físico mínimo para ambos.",
                img: "img/ic_fold.png"
            },
            {
                name: "Esfinge",
                desc: "Sutileza y control desde el suelo. La mujer se tumba boca abajo apoyando su peso sobre sus codos, manteniendo una pierna estirada y la otra doblada hacia el lado para abrir el ángulo. El hombre se sitúa sobre ella para entrar desde atrás, apoyándose en sus manos. Es una posición que permite una gran cercanía de los cuerpos y una estimulación constante y rítmica.",
                img: "img/ic_sphinx.png"
            },
            {
                name: "Tumbona",
                desc: "Relajación total con un toque de audacia. El hombre se sienta con las piernas estiradas y se apoya en sus manos hacia atrás. La mujer se tumba de espaldas frente a él y, con ayuda de un cojín bajo sus nalgas, apoya sus pies cómodamente sobre los hombros de su pareja. Esta configuración ofrece un ángulo de visión inmejorable y una profundidad muy satisfactoria en cada movimiento.",
                img: "img/ic_deckchair.png"
            },
            {
                name: "Cascada",
                desc: "Una caída controlada hacia el placer. El hombre se sienta en una silla o taburete firme mientras la mujer se acomoda en su regazo de frente. Una vez conectados, ella se inclina lentamente hacia atrás (pudiendo apoyar su cabeza en un cojín en el suelo si es necesario) mientras el hombre toma el control total del movimiento, creando una sensación de entrega y profundidad única.",
                img: "img/ic_waterfall.png"
            },
            {
                name: "Doble piso",
                desc: "La posición perfecta para la transición y el juego. Mientras el hombre se tumba de espaldas, la mujer se sitúa sobre él dándole la espalda. Ella se apoya sobre sus codos a ambos lados de la cintura de él y, para ganar equilibrio, apoya sus propios pies sobre las rodillas dobladas del hombre. Es una postura estable que permite un juego rítmico pausado y muy sensual.",
                img: "img/ic_double_decker.png"
            },
            {
                name: "Delfín",
                desc: "Elevación y potencia en movimiento. La mujer se tumba de espaldas y el hombre se sitúa entre sus piernas. En un movimiento coordinado, él la eleva por la cintura de modo que todo el peso de ella descanse sobre sus hombros y cabeza. Esta inclinación invertida permite un juego de gravedades que intensifica cada contacto, requiriendo fuerza por parte de él y confianza por parte de ella.",
                img: "img/ic_dolphin.png"
            },
            {
                name: "Vaquera Invertida",
                desc: "El clásico del control femenino desde un ángulo diferente. El hombre se tumba cómodamente de espaldas mientras la mujer se sienta a horcajadas sobre él, pero dándole la espalda. Desde esta perspectiva, ella dirige absolutamente todo: la velocidad, la profundidad y el ángulo, mientras disfruta de la vista de las piernas y el cuerpo de su pareja bajo ella.",
                img: "img/ic_reverse_cowgirl.png"
            },
            {
                name: "Flor de Loto",
                desc: "Conexión espiritual y física máxima. El hombre se sienta con las piernas cruzadas sobre la cama y la mujer se sienta en su regazo frente a él, envolviendo la cintura de su pareja con sus propias piernas y rodeando su cuello con los brazos. Es una posición de abrazo total que favorece los besos pausados, el contacto visual profundo y un ritmo lento y muy íntimo.",
                img: "img/ic_lotus_blossom.png"
            },
            {
                name: "Amazona",
                desc: "Poder y rebote en una silla. El hombre se sienta en una silla que no sea demasiado alta para que los pies de la mujer lleguen al suelo. Ella se sienta en su regazo frente a él y utiliza sus propios pies para impulsarse hacia arriba y abajo en un movimiento rítmico. Es una postura activa donde ella lleva el mando y el hombre puede disfrutar acariciando todo su cuerpo.",
                img: "img/ic_amazon.png"
            },
            {
                name: "Primer Plano",
                desc: "Fricción lateral e intimidad de espaldas. Ambos se tumban de lado con las rodillas recogidas hacia el pecho. La mujer se sitúa de espaldas al hombre y presiona sus caderas contra él para buscar el contacto. Es una posición que no permite una penetración muy profunda, pero sí una fricción genital muy intensa y placentera, ideal para susurros y caricias por la espalda.",
                img: "img/ic_close_up.png"
            },
            {
                name: "La Estrella",
                desc: "Un juego de ángulos y elevación. La mujer se tumba de espaldas con una pierna estirada y la otra doblada hacia arriba. El hombre se desliza entre sus piernas y coloca una de sus propias piernas bajo la espalda de ella para elevar sus caderas y facilitar el ángulo de entrada. Al apoyarse él hacia atrás sobre sus manos, crea un espacio dinámico para un movimiento rítmico y fluido.",
                img: "img/ic_star.png"
            },
            {
                name: "Parada de manos india",
                desc: "Para parejas acróbatas y audaces. El hombre permanece de pie mientras la mujer realiza una vertical o parada de manos frente a él (puede apoyarse en la pared). El hombre entra desde atrás y la sujeta firmemente por las caderas para ayudarla a mantener el equilibrio mientras se mueven. Es una posición cargada de adrenalina y sensaciones invertidas muy potentes.",
                img: "img/ic_indian_handstand.png"
            },
            {
                name: "Caballo balancín",
                desc: "Balanceo rítmico y relajado. El hombre se sienta con las piernas cruzadas y se inclina sobre sus brazos hacia atrás para apoyarse. La mujer se sienta a horcajadas sobre él con sus rodillas dobladas a ambos lados de la cintura de su pareja. Ella comienza un movimiento de balanceo adelante y atrás, como un columpio, creando una fricción constante y muy satisfactoria para ambos.",
                img: "img/ic_rocking_horse.png"
            },
            {
                name: "Super 8",
                desc: "Sincronía perfecta en horizontal. La mujer se tumba completamente plana con un cojín pequeño bajo sus nalgas para ajustar el ángulo de la pelvis. El hombre se sitúa entre sus piernas apoyándose sobre sus brazos. Ambos comienzan a moverse en un ritmo coordinado y rítmico, como si dibujaran un ocho infinito con sus cuerpos, permitiendo una conexión muy profunda.",
                img: "img/ic_super_8.png"
            },
            {
                name: "Carretilla de pie",
                desc: "Poder y control en suspensión. La mujer se coloca inicialmente a cuatro patas; el hombre se arrodilla detrás de ella y, tras la conexión inicial, eleva suavemente a la mujer del suelo sujetándola por los tobillos. Ella mantiene su peso sobre sus manos o codos mientras el hombre dirige la intensidad del movimiento. Es una postura que derrocha energía y magnetismo.",
                img: "img/ic_standing_wheelbarrow.png"
            },
            {
                name: "Perrito",
                desc: "El clásico de la entrega y la profundidad. La mujer se coloca a cuatro patas apoyándose sobre sus manos o antebrazos, mientras el hombre entra desde atrás. Aunque ella puede moverse presionando hacia él, el hombre tiene el control principal del ritmo y la potencia, permitiendo una penetración profunda que es una de las favoritas por su intensidad y sensaciones.",
                img: "img/ic_doggy_style.png"
            },
            {
                name: "Nirvana",
                desc: "Placer pausado con piernas cerradas. La mujer se tumba de espaldas con las piernas juntas y estiradas, incluso puede agarrarse al cabecero de la cama para estirar su cuerpo. El hombre se sitúa encima con sus piernas por fuera de las de ella. Al entrar mientras ella mantiene las piernas cerradas, la sensación de presión y estrechez aumenta, creando un placer sutil y muy profundo.",
                img: "img/ic_nirvana.png"
            },
            {
                name: "Candado",
                desc: "Unión firme en las alturas. La mujer se sienta en el borde de un mueble alto (una mesa firme o cómoda) y se inclina hacia atrás apoyándose en sus brazos. El hombre permanece de pie frente a ella, y ella envuelve su cintura con sus piernas mientras se conectan. Es una posición muy estable que permite movimientos cortos e intensos, manteniendo una conexión visual muy sexy.",
                img: "img/ic_padlock.png"
            },
            {
                name: "Rock 'n' Roller",
                desc: "Dinamismo y elevación pélvica. En plena pasión, la mujer tumba de espaldas con un cojín bajo la cabeza y eleva sus piernas hacia el aire, dejando que su pelvis se despegue del suelo. El hombre se arrodilla frente a ella y mantiene las caderas de ella elevadas apoyándolas sobre sus propios muslos. Esta inclinación facilita un ángulo de entrada profundo y un movimiento rítmico y potente.",
                img: "img/ic_rock_n_roller.png"
            },
            {
                name: "Tobogán invertido",
                desc: "Un desafío de inclinación y equilibrio. El hombre se sienta en el borde de la cama apoyando su espalda en un cojín firme. La mujer se sitúa a horcajadas sobre él y dobla sus piernas hasta que sus rodillas queden a la altura de los hombros de su pareja. Lentamente, ella se inclina hacia atrás hasta apoyar sus manos en el suelo, creando un arco de placer donde ella controla el ritmo con sus pies y él disfruta de una conexión profunda.",
                img: "img/ic_backward_slide.png"
            },
            {
                name: "Llaves cruzadas",
                desc: "Sencillez y efectividad en el borde de la cama. La mujer se tumba de espaldas situando sus nalgas justo en el borde del colchón y eleva sus piernas cruzándolas en el aire. El hombre permanece de pie frente a ella, sujetando sus piernas para ganar estabilidad mientras se mueve. Es una posición que permite una gran cercanía y un control total de la profundidad por parte del hombre.",
                img: "img/ic_crossed_keys.png"
            },
            {
                name: "Simio",
                desc: "Una configuración inusual y muy estimulante. El hombre se tumba de espaldas y lleva sus rodillas hacia el pecho de forma compacta. La mujer se sienta sobre él pero dándole la espalda, apoyándose en los pies de su pareja para ganar altura y equilibrio. Esta posición sentada inversa ofrece sensaciones de fricción muy diferentes y un campo visual muy sexy para ambos.",
                img: "img/ic_ape.png"
            },
            {
                name: "Loto reclinado",
                desc: "Para amantes flexibles que buscan una unión profunda. La mujer se tumba de espaldas y cruza sus piernas en el aire en posición de loto. El hombre se sitúa sobre ella para la unión. Esta apertura pélvica forzada permite un ángulo de entrada muy directo y una sensación de plenitud constante, requiriendo una sincronización suave y rítmica.",
                img: "img/ic_reclining_lotus.png"
            },
            {
                name: "Gran apertura",
                desc: "Elevación estratégica para el placer máximo. La mujer se tumba de espaldas con un cojín bajo su cabeza. El hombre se arrodilla entre sus piernas y desliza sus propios muslos bajo la espalda de ella, elevando su pelvis de forma natural y decidida. Esta postura facilita una penetración fluida y profunda, permitiendo que ambos se concentren en el ritmo y el contacto piel con piel.",
                img: "img/ic_wide_opened.png"
            },
            {
                name: "Indrani",
                desc: "El control femenino en su máxima expresión desde el suelo. La mujer se tumba de espaldas con las rodillas pegadas al pecho, mientras el hombre se desliza entre sus piernas. Ella tiene sus manos libres para sujetar al hombre por los hombros o brazos, atrayéndolo hacia sí y marcando ella misma la profundidad y el ritmo de cada encuentro.",
                img: "img/ic_indrani.png"
            },
            {
                name: "Congreso suspendido",
                desc: "Una demostración de pasión y apoyo mutuo. El hombre se apoya firmemente contra una pared mientras eleva a la mujer del suelo, sosteniéndola firmemente por las nalgas. Ella envuelve la cintura de él con sus muslos para asegurar la unión. Es una posición que desprende fuerza y entrega, ideal para momentos de gran intensidad física y cercanía emocional.",
                img: "img/ic_suspended_congress.png"
            },
            {
                name: "Tijeras suspendidas",
                desc: "Asimetría y control en el borde. La mujer se tumba de espaldas en el extremo de la cama, apoyando un solo pie para estabilidad y sosteniéndose en el suelo con un brazo. El hombre permanece de pie, situándose junto a la pierna apoyada de ella y elevando su otra pierna con sus manos. Crea un ángulo de apertura en 'tijera' que ofrece sensaciones internas muy variadas.",
                img: "img/ic_suspended_scissors.png"
            },
            {
                name: "Hélice",
                desc: "Un movimiento circular e hipnótico. La mujer se tumba completamente plana de espaldas con las piernas juntas. El hombre se sitúa sobre ella pero mirando hacia sus pies, en dirección opuesta. Una vez conectados, él comienza a mover sus caderas en un movimiento circular pausado, como una hélice, creando una fricción envolvente y muy placentera para ambos.",
                img: "img/ic_propeller.png"
            },
            {
                name: "Tigre propenso",
                desc: "Un encuentro suave y dominado por ella. El hombre se sienta en la cama con las piernas estiradas frente a él. La mujer, dándole la espalda, abre sus piernas y se baja lentamente sobre él, controlando el descenso y el ritmo. Al quedar posicionada sobre él con sus piernas estiradas hacia atrás, se crea una conexión fluida y muy cómoda ideal para un placer prolongado.",
                img: "img/ic_prone_tiger.png"
            },
            {
                name: "Entrecruzado",
                desc: "De lado y en ángulo recto. Ambos se tumban de lado enfrentados, pero el hombre se coloca en un ángulo de noventa grados respecto a la mujer. Él desliza su cuerpo entre las piernas de ella para la unión. Esta disposición 'en cruz' permite un contacto lateral muy íntimo y movimientos rítmicos que se sienten de forma muy distinta a las posiciones frontales.",
                img: "img/ic_crisscross.png"
            },
            {
                name: "V erótica",
                desc: "Elevación y soporte visual. La mujer se sienta en el borde de una mesa firme y el hombre permanece de pie frente a ella. Ella eleva sus piernas apoyando la parte posterior de sus rodillas sobre los hombros de su pareja, formando una 'V'. Ella puede rodear el cuello de él con sus brazos para soporte, mientras el hombre sujeta sus nalgas para dirigir rítmicamente el encuentro.",
                img: "img/ic_erotic_v.png"
            },
            {
                name: "Rueda de Catalina",
                desc: "Equilibrio mutuo sentados. Ambos se sientan frente a frente entrelazando sus cuerpos. Ella envuelve la cintura de él con sus piernas mientras se conectan. Para mantener la estabilidad en esta danza circular, ella se apoya en sus brazos tras ella y él hace lo propio sobre sus codos. Juntos buscan un ritmo sincronizado y armónico lleno de contacto visual.",
                img: "img/ic_catherine_wheel.png"
            },
            {
                name: "Arco del triunfo",
                desc: "Flexibilidad y entrega total. Esta postura requiere una gran elasticidad por parte de la mujer, quien se tumba de espaldas con sus piernas dobladas hacia atrás bajo su propio cuerpo. El hombre se desliza entre sus muslos con sus piernas estiradas a los lados de la cabeza de ella. Es una posición de apertura total y profundidad absoluta para momentos de gran conexión.",
                img: "img/ic_triumph_arch.png"
            },
            {
                name: "Clasificación X",
                desc: "Una perspectiva audaz y directa. El hombre se tumba cómodamente de espaldas con un cojín tras su cabeza. La mujer se coloca sobre él dándole la espalda, inclinándose hacia adelante para rodear las piernas del hombre con sus brazos. Esta postura le ofrece a ella un gran control de movimiento y a él una visión espectacular y 'clasificada X' de toda la acción.",
                img: "img/ic_x_rated.png"
            },
            {
                name: "Apoyo al hombro",
                desc: "Elevación total invertida. La mujer se tumba de espaldas y, con la ayuda decidida del hombre, eleva sus piernas y todo su torso hacia el aire. El hombre se arrodilla tras ella y entra mientras ella descansa sus piernas firmemente sobre los hombros de su pareja. Es una posición que requiere fuerza y equilibrio, ofreciendo una profundidad y ángulo excepcionales.",
                img: "img/ic_shoulder_stand.png"
            },
            {
                name: "Bote de remos",
                desc: "Un vaivén rítmico frente a frente. La pareja comienza con el hombre tumbado y la mujer sentada sobre él. Una vez conectados, el hombre se incorpora lentamente hasta quedar ambos sentados frente a frente con las piernas entrelazadas. Pueden sujetarse por debajo de las rodillas del otro para ganar soporte mientras se mueven adelante y atrás como si remaran juntos.",
                img: "img/ic_rowing_boat.png"
            },
            {
                name: "Pausa Zen",
                desc: "La calma antes de la tormenta de placer. Ambos se tumban de lado, uno frente al otro, en actitud relajada. La mujer envuelve rítmicamente al hombre con sus piernas mientras se conectan. Es una posición ideal para movimientos lentos, caricias suaves y una conexión íntima sin prisa, favoreciendo la relajación y el disfrute sensorial mutuo.",
                img: "img/ic_zen_pause.png"
            },
            {
                name: "Desprendimiento",
                desc: "Exploración de espaldas y desde los codos. La mujer se tumba boca abajo estirando sus piernas y eleva su torso apoyándose en los codos. El hombre se sienta entre sus piernas mirando hacia su propio cuerpo, inclinándose ligeramente para entrar desde atrás. Al apoyarse él en sus manos tras de sí, crea un ángulo de empuje rítmico y potente que ella siente con gran intensidad.",
                img: "img/ic_landslide.png"
            },
            {
                name: "Supernova",
                desc: "Un desafío a la gravedad y los sentidos. Mientras el hombre se tumba de espaldas con la parte superior de su cuerpo colgando fuera del borde de la cama, la mujer se sienta a horcajadas sobre él. Ella se inclina hacia atrás apoyándose en sus propios brazos para ganar estabilidad. Esta inclinación inusual cambia la percepción del placer y ofrece un ritmo dinámico y muy visual para ambos.",
                img: "img/ic_supernova.png"
            },
            {
                name: "Equilibrio agazapado",
                desc: "Una danza de control y descenso. La mujer se coloca de espaldas al hombre mientras ambos permanecen de pie sobre la cama. Ella se baja lentamente sobre él de espaldas, usando los brazos de su pareja para mantener el equilibrio y la seguridad. Él coloca sus manos en las nalgas de ella para guiar el movimiento, creando una penetración profunda y controlada muy estimulante.",
                img: "img/ic_squat_balance.png"
            },
            {
                name: "Sujeción de hombro",
                desc: "Elevación lineal y enfoque profundo. La mujer se tumba de espaldas con un cojín bajo su cabeza y eleva sus piernas totalmente rectas hacia el aire. El hombre se arrodilla para la unión mientras sujeta las piernas de ella y las apoya firmemente contra uno de sus hombros. Usa su otra mano para apoyarse en la cama, permitiendo empujes decididos y una conexión física muy estrecha.",
                img: "img/ic_shoulder_holder.png"
            },
            {
                name: "Seducción",
                desc: "Flexibilidad pura para una entrega total. La mujer se tumba de espaldas y dobla sus piernas bajo su propio cuerpo, una postura que solo debe intentarse si se es bastante flexible. El hombre se sitúa sobre ella para la unión. Esta posición de apertura pélvica pasiva permite un contacto corporal total y un ritmo pausado, donde el roce y la calidez de los cuerpos son los protagonistas.",
                img: "img/ic_seduction.png"
            },
            {
                name: "Pierna lasciva",
                desc: "Pasión de pie con un toque de altura. Ambos permanecen de pie frente a frente. La mujer comienza apoyando una de sus piernas sobre la cama o un mueble firme para permitir la unión inicial. Una vez conectados, el hombre la ayuda suavemente a elevar esa pierna hasta apoyarla sobre su propio hombro. Es una posición asimétrica que ofrece una gran cercanía y un ángulo de placer muy directo.",
                img: "img/ic_lustful_leg.png"
            },
            {
                name: "Triángulo brillante",
                desc: "El hombre sobre ella en equilibrio dinámico. La mujer se tumba de espaldas mientras el hombre se sitúa sobre ella, pero en lugar de tumbarse, se coloca a cuatro patas. Ella debe elevar su pelvis activamente para buscar la conexión. En esta postura, el hombre permanece estático como un soporte firme, mientras la mujer realiza todo el trabajo rítmico elevando y descendiendo caderas.",
                img: "img/ic_glowing_triangle.png"
            },
            {
                name: "Curva en Y",
                desc: "Placer invertido en el borde. La mujer se tumba boca abajo en la cama y deja que la parte superior de su cuerpo cuelgue fuera del borde (puede usar un cojín en el suelo para su cabeza). El hombre se sitúa entre las piernas de ella para entrar desde atrás, elevando su propio cuerpo para no ejercer peso sobre la espalda de ella. Es un ángulo inusual que ofrece sensaciones internas muy potentes.",
                img: "img/ic_y_curve.png"
            },
            {
                name: "Montaña mágica",
                desc: "Apoyo cómodo para una profundidad suave. Primero se crea una 'montaña' con una pila de cojines firmes. La mujer se arrodilla y se inclina sobre ellos, apoyando su pecho sobre los cojines. El hombre se arrodilla detrás de ella con sus piernas abrazando las de su pareja y entra profundamente. La suavidad de los cojines permite movimientos rítmicos muy placenteros y prolongados.",
                img: "img/ic_magic_mountain.png"
            },
            {
                name: "Portátil",
                desc: "El abrazo total en el asiento. El hombre se sienta en una silla y usa un cojín bajo sus rodillas para elevarlas ligeramente. La mujer se sienta en su regazo frente a él y eleva sus piernas hasta envolver el cuello de su pareja con ellas. Ella se balancea rítmicamente sobre él mientras el hombre sujeta su espalda con las manos, creando una conexión física y visual absoluta.",
                img: "img/ic_lap_top.png"
            },
            {
                name: "Maestro de escaleras",
                desc: "Pasión en los niveles. Utilizando el desnivel de una escalera, la mujer se arrodilla en un peldaño mientras su pareja se sitúa un par de escalones más abajo para entrar desde atrás. Ella puede apoyarse en el peldaño superior o en la barandilla para equilibrio, mientras el hombre sujeta sus caderas. El ángulo que crea la escalera facilita una penetración muy cómoda y rítmica.",
                img: "img/ic_stair_master.png"
            },
            {
                name: "Sirena",
                desc: "Elevación en el borde de la mesa. La mujer se tumba sobre una mesa firme con sus nalgas justo en el borde. Eleva ambas piernas hacia el aire (un cojín bajo sus nalgas ayuda a la comodidad) mientras el hombre permanece de pie para la unión. Él puede sujetar los pies de ella para ganar estabilidad, permitiendo un movimiento rítmico, profundo y muy visual para ambos.",
                img: "img/ic_mermaid.png"
            },
            {
                name: "Acompañante",
                desc: "Sutileza lateral de espaldas. La mujer se tumba de costado dando la espalda al hombre. Él se arrodilla detrás de ella, mirando hacia su cabeza, y se sitúa sobre una de las piernas de su pareja para entrar. Ella estira su pierna superior para dar más espacio de maniobra, creando una conexión lateral muy íntima que permite caricias constantes por toda la espalda y cuello de ella.",
                img: "img/ic_sidekick.png"
            },
            {
                name: "Maestro de muslos",
                desc: "Un juego de ángulos sentados. El hombre se tumba de espaldas con las piernas dobladas y ligeramente abiertas. La mujer se sitúa de espaldas a él y se sienta sobre uno de los muslos de su pareja. Con su cuerpo en un ligero ángulo, ella se sujeta de las rodillas de él para controlar el descenso y el ritmo, creando una fricción lateral muy excitante y profunda.",
                img: "img/ic_thigh_master.png"
            },
            {
                name: "Mariposa",
                desc: "Apertura y elevación visual. Similar a la sirena, la mujer se tumba en una mesa baja con sus nalgas en el borde. El hombre de pie la ayuda a elevar sus caderas con sus manos mientras ella apoya sus piernas sobre los hombros de su pareja. Esta apertura total permite una visión clara y una penetración rítmica y profunda que se siente de forma muy intensa por ambos.",
                img: "img/ic_butterfly.png"
            },
            {
                name: "Samba lateral",
                desc: "Ritmo de lado a noventa grados. La mujer se tumba de costado con las piernas estiradas frente a ella en ángulo recto (90 grados). Ella inclina su pelvis ligeramente hacia adentro mientras el hombre se tumba detrás de ella, elevando su torso con sus brazos para entrar. Es una postura que requiere coordinación y ofrece sensaciones de fricción lateral rítmica muy placenteras.",
                img: "img/ic_sideways_samba.png"
            },
            {
                name: "Montura lateral",
                desc: "Balanceo giratorio sentados. Mientras el hombre se tumba de espaldas con un cojín bajo la cabeza, la mujer se sienta sobre él de lado, apoyando sus pies a un costado y sus manos al otro. Una vez conectados, ella comienza a realizar movimientos giratorios y de vaivén que crean una fricción envolvente deliciosa, mientras el hombre disfruta relajado del ritmo de su pareja.",
                img: "img/ic_side_saddle.png"
            },
            {
                name: "La Propuesta",
                desc: "Unión frente a frente de rodillas. Ambos se arrodillan frente a frente (es ideal si tienen alturas similares). El hombre apoya un pie en el suelo y ella hace lo mismo con el pie opuesto, imitando la postura de una pedida de mano. Se abrazan para ganar estabilidad y comienzan un movimiento suave y rítmico que favorece mucho el contacto visual y los besos.",
                img: "img/ic_proposal.png"
            },
            {
                name: "Fuerza G",
                desc: "Elevación pélvica coordinada. La mujer se tumba de espaldas y lleva sus rodillas totalmente hacia el pecho. El hombre se arrodilla tras ella y la eleva hasta que la espalda de ella quede paralela a los muslos de él. Ella se sujeta de las piernas del hombre para equilibrio, mientras él la sostiene de los pies y entra profundamente, desafiando la gravedad en cada empuje.",
                img: "img/ic_g_force.png"
            },
            {
                name: "Ángulo Recto",
                desc: "Eficacia y placer en el borde. La mujer se tumba de espaldas con sus nalgas en el borde de una cama o mesa firme. El hombre permanece de pie y entra mientras acaricia sus pechos o clítoris. Si ella cruza sus tobillos tras la espalda de él y presiona, la intensidad aumenta sin necesidad de grandes movimientos, permitiendo una conexión rítmica, profunda e ininterrumpida.",
                img: "img/ic_right_angle.png"
            }
        ],
        times: ["1 minuto", "3 minutos", "5 minutos", "8 minutos", "10 minutos", "15 minutos"],
        bodyPartsWoman: ["Cuello", "Pechos", "Espalda", "Muslos", "Labios", "Orejas", "Clítoris", "Vientre"],
        bodyPartsMan: ["Cuello", "Pectorales", "Espalda", "Abdomen", "Orejas", "Labios", "Pene", "Nalgas"],
        questions: [
            { text: "¿<player1> te gustaría que <player2> usara algún juguete nuevo contigo ahora mismo?", roles: true },
            { text: "<player1>, si pudieras obligar a <player2> a quitarse una prenda ahora, ¿cuál elegirías?", roles: true },
            { text: "¿<player1> qué es lo que más te está tentando de <player2> en este momento?", roles: true },
            { text: "<player1>, susúrrale a <player2> algo que quieras hacerle cuando termine este juego.", roles: true },
            { text: "¿<player1> te gustaría que <player2> te vendara los ojos en las siguientes 5 rondas?", roles: true },
            { text: "<player1>, dale un beso a <player2> en el lugar más sensible que conozcas de su cuerpo.", roles: true },
            { text: "¿<player1> cuál es la fantasía que más te gustaría cumplir con <player2> hoy?", roles: true },
            { text: "<player1>, describe con tres palabras cómo te hace sentir el contacto de <player2>.", roles: true },
            { text: "¿<player1> preferirías que <player2> fuera lento o rápido en lo que sigue?", roles: true },
            { text: "<player1>, toca a <player2> en su zona favorita por 10 segundos.", roles: true },
            { text: "¿<player1>, qué parte de <player2> morderías ahora mismo? Muérdela.", roles: true },
            { text: "<player1>, confiesa a <player2> un pensamiento impuro que hayas tenido hoy.", roles: true },
            { text: "¿<player1>, te gusta cuando <player2> te mira fijamente a los ojos?", roles: true },
            { text: "<player1>, dale un masaje en los hombros a <player2>.", roles: true },
            { text: "¿<player1>, qué posición de las que vimos te gustaría probar primero con <player2>?", roles: true },
            { text: "<player1>, quítale un zapato o calcetín a <player2> de forma lenta.", roles: true },
            { text: "¿<player1>, qué sonido hace <player2> que más te excita?", roles: true },
            { text: "<player1>, ¿qué es lo más atrevido que harías con <player2> en público?", roles: true },
            { text: "¿<player1>, prefieres dar o recibir placer de <player2>?", roles: true },
            { text: "<player1>, susúrrale a <player2> tu secreto mejor guardado.", roles: true },
            { text: "¿<player1>, te gustaría que <player2> te dominara por el resto de la noche?", roles: true },
            { text: "<player1>, acaricia el cuello de <player2> con tus labios.", roles: true },
            { text: "¿<player1>, qué olor de <player2> te vuelve loco/a?", roles: true },
            { text: "<player1>, desabrocha un botón de la ropa de <player2>.", roles: true },
            { text: "¿<player1>, te gustaría que <player2> te grabara un audio sexy?", roles: true },
            { text: "<player1>, mira a <player2> a los ojos y dile lo mucho que le deseas.", roles: true },
            { text: "¿<player1>, qué prenda de <player2> te gustaría ver en el suelo?", roles: true },
            { text: "<player1>, muerde suavemente el lóbulo de la oreja de <player2>.", roles: true },
            { text: "¿<player1>, te gustaría un juego de roles con <player2>?", roles: true },
            { text: "<player1>, dibuja un círculo imaginario en la palma de la mano de <player2>.", roles: true },
            { text: "¿<player1>, qué parte de <player2> nunca dejarías de besar?", roles: true },
            { text: "<player1>, confiesa a <player2> tu lugar prohibido favorito.", roles: true },
            { text: "¿<player1>, te gustaría que <player2> fuera más agresivo/a o más dulce?", roles: true },
            { text: "<player1>, dale un beso de película a <player2>.", roles: true },
            { text: "¿<player1>, qué es lo más romántico que <player2> ha hecho por ti?", roles: true },
            { text: "<player1>, acaricia la espalda de <player2> bajo su ropa.", roles: true },
            { text: "¿<player1>, te gustaría que <player2> te hiciera un striptease?", roles: true },
            { text: "<player1>, muerde el labio inferior de <player2> con cuidado.", roles: true },
            { text: "¿<player1>, qué es lo que más te sorprendió de <player2> la primera vez?", roles: true },
            { text: "<player1>, describe el cuerpo de <player2> usando solo metáforas de comida.", roles: true },
            { text: "¿<player1>, te gustaría que <player2> usara lencería especial hoy?", roles: true },
            { text: "<player1>, susúrrale a <player2> un piropo muy subido de tono.", roles: true },
            { text: "¿<player1>, qué es lo más salvaje que has imaginado con <player2>?", roles: true },
            { text: "<player1>, dale un beso a <player2> en la nuca.", roles: true },
            { text: "¿<player1>, te gustaría que <player2> te amarrara las manos?", roles: true },
            { text: "<player1>, respira cerca del oído de <player2> sin tocarlo.", roles: true },
            { text: "¿<player1>, qué parte de ti quieres que <player2> toque ahora?", roles: true },
            { text: "<player1>, quítale una prenda a <player2> (tú eliges cuál).", roles: true },
            { text: "¿<player1>, prefieres la luz encendida o apagada con <player2>?", roles: true },
            { text: "<player1>, cuenta hasta diez mientras acaricias el muslo de <player2>.", roles: true },
            { text: "¿<player1>, qué es lo más vergonzoso que te excita de <player2>?", roles: true },
            { text: "<player1>, dale un beso a <player2> en el ombligo.", roles: true },
            { text: "¿<player1>, te gustaría que <player2> te diera nalgadas suaves?", roles: true },
            { text: "<player1>, susúrrale a <player2> tres cosas que le harías en una ducha.", roles: true },
            { text: "¿<player1>, qué recuerdo sexual con <player2> es tu favorito?", roles: true },
            { text: "<player1>, lame el cuello de <player2> de abajo hacia arriba.", roles: true },
            { text: "¿<player1>, te gustaría que <player2> usara esposas contigo?", roles: true },
            { text: "<player1>, elige una canción que te recuerde a una noche con <player2>.", roles: true },
            { text: "¿<player1>, qué es lo primero que notas cuando <player2> entra a la habitación?", roles: true },
            { text: "<player1>, dale un beso a <player2> en cada párpado.", roles: true },
            { text: "¿<player1>, te gustaría que <player2> fuera tu esclavo/a por una hora?", roles: true },
            { text: "<player1>, acaricia el interior del brazo de <player2>.", roles: true },
            { text: "¿<player1>, qué palabra clave usarías con <player2> para detener el juego?", roles: true },
            { text: "<player1>, dale un beso apasionado de 30 segundos a <player2>.", roles: true }
        ],
        dares: [
            "Dale un masaje de 3 minutos en los pies a tu pareja.",
            "Susúrrale tres fantasías prohibidas al oído.",
            "Realiza un striptease lento quitándote 3 prendas.",
            "Quítale la ropa interior a tu pareja usando solo los dientes 1 sola vez.",
            "Dale 10 besos húmedos en el cuello.",
            "Imita tu posición sexual favorita sin tocar a tu pareja por 30 segundos.",
            "Escribe tu nombre en el pecho de tu pareja con la lengua durante 1 minuto.",
            "Usa un hielo y recórrele toda la espalda hasta las nalgas 3 veces seguidas.",
            "Muerde suavemente el lóbulo de la oreja de tu pareja.",
            "Véndale los ojos a tu pareja y dale de comer 5 bocados de forma sensual.",
            "Haz un baile erótico en el regazo de tu pareja (Lap dance) por 3 minutos.",
            "Acaricia la zona íntima de tu pareja por encima de la ropa por 2 minutos.",
            "Dale un beso apasionado de 1 minuto sin usar las manos.",
            "Describe con detalle 3 cosas que le harías a tu pareja si estuvieran en un ascensor solos.",
            "Deja que tu pareja te ponga en la posición que quiera por 3 minutos.",
            "Lame una línea desde el ombligo hasta su ropa interior 5 veces seguidas.",
            "Susúrrale a tu pareja 5 cosas que más te gustan de su cuerpo.",
            "Quédate en ropa interior por las próximas 3 rondas del juego.",
            "Dale 2 besos en cada parte del cuerpo que tu pareja elija.",
            "Gime el nombre de tu pareja al oído 5 veces de forma muy excitante.",
            "Dibuja 2 corazones en el muslo de tu pareja dándole besos.",
            "Deja que tu pareja te de 10 nalgadas suaves.",
            "Bebe 3 tragos de alguna bebida directamente del ombligo de tu pareja.",
            "Quítate 1 prenda de ropa de la parte inferior ahora mismo.",
            "Muerde suavemente el pecho de tu pareja 5 veces en cada lado.",
            "Unta algo dulce en el cuello de tu pareja y quítalo con la lengua por 1 minuto.",
            "Dale 10 besos en el interior de los muslos a tu pareja.",
            "Seduce a tu pareja como si fuera un desconocido durante 3 minutos.",
            "Ponte una prenda de ropa de tu pareja por los próximos 10 minutos.",
            "Dale un masaje en las nalgas a tu pareja con crema por 5 minutos.",
            "Menciona 3 posiciones de la ruleta que quieras hacer hoy.",
            "Pasa tu lengua por los labios de tu pareja 10 veces sin llegar a besarla.",
            "Abrocha y desabrocha su prenda 5 veces seguidas.",
            "Lleva a tu pareja al borde del placer usando solo tus manos por 60 segundos.",
            "Deja que tu pareja te toque donde quiera por 3 minutos constantes sin poder negarte.",
            "Simula un orgasmo ruidoso durante 30 segundos seguidos.",
            "Recorre con tus dedos desde su rodilla hasta su zona íntima 5 veces.",
            "Quítale ambos calcetines a tu pareja con la boca en menos de 1 minuto.",
            "Dale un beso francés de lengua muy profundo que dure 45 segundos.",
            "Describe 3 fantasías para tu noche perfecta de sexo desenfrenado.",
            "Acaricia su piel con tus uñas suavemente durante 1 minuto entero.",
            "Ponte en posición de perrito y recibe 5 nalgadas rítmicas.",
            "Bebe un vaso de agua mientras tu pareja lo sostiene por 1 minuto.",
            "Cuenta 2 historias sobre los lugares más extraños donde has tenido sexo.",
            "Deja que tu pareja se siente en tu cara (con ropa) por 60 segundos.",
            "Dale un beso en la mano y sube hasta la axila 3 veces seguidas.",
            "Susúrrale 5 palabras sucias al oído mientras le muerdes el cuello.",
            "Ponte su ropa interior sobre la tuya por las próximas 2 rondas.",
            "Deja que tu pareja te haga cosquillas por 45 segundos sin moverte.",
            "Haz un sonido de animal cada vez que te toque durante los próximos 2 minutos.",
            "Solo lame su zona íntima durante 50 segundos.",
            "Quítate los pantalones y permanece así por los próximos 15 minutos.",
            "Deja que tu pareja te use como silla humana por 2 minutos.",
            "Dale 5 besos lentos en cada uno de sus dedos de los pies.",
            "Describe 3 pensamientos sexuales que tuviste sobre tu pareja hoy.",
            "Usa tu cuerpo como plato para que tu pareja coma algo durante 2 minutos.",
            "Susúrrale una palabra prohibida diferente cada 10 segundos por 1 minuto.",
            "Masajea con tu nariz su zona íntima (con ropa) por 90 segundos.",
            "Deja que tu pareja te dibuje un símbolo sexy en la espalda durante 1 minuto.",
            "Intenta excitar a tu pareja usando solo tus pies por 3 minutos.",
            "Dale 5 besos en la frente, 5 en la nariz y 5 en los labios.",
            "Muerde su labio superior suavemente 10 veces seguidas.",
            "Sigue todas las órdenes de tu pareja por los próximos 10 minutos.",
            "Revela 2 cosas que nunca te has atrevido a pedir en la cama.",
            "Haz de almohada humana para tu pareja durante 3 minutos seguidos.",
            "Susúrrale tus planes eróticos detallados para esta noche por 2 minutos.",
            "Dale 20 besos sorpresa en partes del cuerpo aleatorias.",
            "Dale a tu pareja 10 'besos de mariposa' con tus pestañas en sus pechos.",
            "Gime de placer mientras tu pareja te respira en el cuello por 1 minuto.",
            "Desfila de forma sexy con la ropa de tu pareja por 2 minutos.",
            "Deja que tu pareja elija 1 zona de tu cuerpo para jugar por 3 minutos.",
            "Inventa y cuenta una historia erótica de al menos 2 minutos.",
            "Besos en el ombligo bajando 2 centímetros cada vez hasta llegar abajo.",
            "Trata a tu pareja como la realeza dándole masajes por 5 minutos.",
            "Acaríciate sensualmente frente a tu pareja durante 2 minutos.",
            "Muerde suavemente cada uno de sus dedos de la mano 3 veces.",
            "Susúrrale 'Te deseo mucho' 5 veces de formas diferentes.",
            "Masajea su cabeza mientras besas su cuello por 3 minutos seguidos.",
            "Mantén una posición extraña por 1 minuto mientras te toma una foto.",
            "Cuenta la confesión sexual que más te sonroje detalladamente.",
            "Dale 3 besos a cada prenda de ropa que te quites en esta ronda.",
            "Deja que tu pareja explore tu cuerpo con ojos cerrados por 2 minutos.",
            "Imita 3 sonidos orgásmicos diferentes que tu pareja quiera oche.",
            "Haz reír a tu pareja y bésala apasionadamente por 1 minuto."
        ],
        punishments: [
            "Debes quitarte TODA la ropa y permanecer totalmente desnudo/a por las próximas 5 rondas.",
            "Tu pareja tiene control total sobre tus manos; las mantendrá atadas o sujetas por 10 minutos.",
            "Recibe 30 nalgadas rítmicas con la intensidad que tu pareja decida.",
            "Quédate inmóvil mientras tu pareja te explora durante 5 minutos sin que puedas quejarte.",
            "Debes lamer la zona íntima de tu pareja (con o sin ropa) durante 3 minutos sin detenerte.",
            "Tu pareja inventará una penitencia extrema ahora mismo y debes cumplirla por 5 minutos.",
            "No puedes usar palabras, solo gemidos de placer, durante los próximos 15 minutos de juego.",
            "Bebe 2 vasos grandes de agua o 1 shot de algo fuerte de un solo trago.",
            "Debes permanecer con los ojos vendados durante los próximos 20 minutos de juego.",
            "Mantén la posición del Kamasutra que elija tu pareja durante 3 minutos seguidos.",
            "Soporta un masaje con hielo en tus zonas más sensibles hasta que se derritan 2 cubos enteros.",
            "Lame y besa los pies de tu pareja durante 5 minutos sin descanso.",
            "Entrega tu ropa interior a tu pareja; ella decidirá cuándo puedes recuperarla.",
            "Deja que tu pareja te dibuje 3 símbolos eróticos en zonas visibles con un marcador.",
            "Sé el esclavo/a sexual de tu pareja cumpliendo 5 órdenes directas sin protestar.",
            "Debes arrodillarte ante tu pareja y pedirle placer de rodillas durante 2 minutos.",
            "Pasa los próximos 10 minutos de juego solo en ropa interior, sin importar el frío.",
            "Recibe 50 besos en la zona que tu pareja elija, sin moverte.",
            "Tu pareja te prohibirá tocar una zona de tu propio cuerpo por el resto del juego.",
            "Debes confesar tu fantasía más oscura y 'sucia' con todo lujo de detalles.",
            "Haz un striptease completo frente a tu pareja en menos de 1 minuto.",
            "Debes lamer el cuello de tu pareja 20 veces de arriba hacia abajo rítmicamente.",
            "Tu pareja elegirá una prenda tuya para que la rompas o la deseches (si estás de acuerdo).",
            "Permanece en posición de plancha (ejercicio) mientras tu pareja te acaricia por 1 minuto.",
            "Dale a tu pareja 10 minutos de placer oral sin que ella tenga que hacer nada.",
            "Debes imitar un acto sexual solo/a mientras tu pareja te observa por 2 minutos.",
            "Tu pareja puede usarte como su juguete personal durante los próximos 10 minutos.",
            "Recibe 5 mordiscos intensos (sin hacer daño) en las nalgas.",
            "Debes caminar por la habitación de forma sexy y gatear hasta tu pareja 5 veces.",
            "No puedes tocar a tu pareja por las próximas 3 rondas, aunque ella te provoque.",
            "Debes servirle una bebida a tu pareja usando solo tu boca.",
            "Quédate boca abajo y deja que tu pareja use tu espalda como mesa por 5 minutos.",
            "Recibe un masaje sensual de tu pareja pero no puedes emitir ningún sonido por 3 minutos.",
            "Debes besar cada centímetro de las piernas de tu pareja, desde el tobillo hasta la cadera.",
            "Tu pareja tiene 'derecho a roce' total contigo por los próximos 10 minutos sin que tú participes."
        ],
        stimulators: ["Boca", "Manos", "Dedos", "Lengua", "Labios", "Piernas"],
        zones: ["Cuello", "Pechos", "Espalda", "Abdomen", "Orejas", "Nalgas", "Muslos", "Zona íntima", "Pies"],
        masterGames: [
            { text: "Cata a Ciegas", icon: "utensils", desc: "Véndale los ojos a tu pareja y dale a probar sabores intensos (dulce, picante, frío) desde tu piel." },
            { text: "El Juego del Hielo", icon: "snowflake", desc: "Recorre el cuerpo de tu pareja con un hielo. Cuando se derrita, usa tu boca para calentar esa zona." },
            { text: "Cámara Lenta", icon: "timer", desc: "Durante los próximos 5 minutos, cada beso, caricia y movimiento debe ser a cámara lenta." },
            { text: "Solo Palabras", icon: "mic", desc: "No pueden tocarse. Deben describirse con detalle exacto qué le harían al otro ahora mismo." },
            { text: "Cronómetro Erótico", icon: "watch", desc: "3 minutos para excitar al máximo a tu pareja sin tocar sus zonas genitales. Luego cambian." },
            { text: "Poner a 100", icon: "flame", desc: "Lleva a tu pareja al borde del clímax usando solo tus manos y boca, pero prohíbe el final hasta que te ruegue por él." },
            { text: "Mapa del Placer", icon: "map", desc: "Usa tus dedos para dibujar un mapa invisible en su cuerpo, descubriendo 3 puntos nuevos de placer." },
            { text: "El Observador", icon: "eye", desc: "Uno de ustedes debe estimularse mientras el otro observa a pocos centímetros sin poder intervenir de ninguna manera." },
            { text: "Masaje Tántrico", icon: "sparkles", desc: "Un masaje de 10 minutos por todo el cuerpo usando aceite, con caricias extremadamente suaves y lentas." },
            { text: "Edging Extremo", icon: "trending-up", desc: "Lleven el ritmo hasta el límite, deténganse por 30 segundos, y repitan esto 10 veces antes de seguir." },
            { text: "Grabación Hot", icon: "video", desc: "Graba un video corto (30 seg) haciendo algo muy atrevido. Pueden borrarlo después o guardarlo." },
            { text: "Sin Manos", icon: "hand-metal", desc: "Debes dar placer a tu pareja usando solo tu boca, lengua y respiración durante 5 minutos." },
            { text: "Ojos Vendados", icon: "eye-off", desc: "Uno queda a ciegas. El otro usa diferentes texturas (plumas, seda, lengua) para sorprenderlo." },
            { text: "Esclavo de Placer", icon: "user-check", desc: "Cumple todas las órdenes físicas de tu pareja por los próximos 20 minutos sin rechistar." }
        ],
        prohibitions: ["Labios", "Cuello", "Pechos", "Zona Íntima", "Orejas", "Muslos"]
    };

    // ============================================================
    //  MEJORAS GLOBALES
    //  Jugadores · Intensidad · Mazos sin repetición · Timer · Ruleta
    // ============================================================

    // --- Jugadores (nombres personalizados, guardados en el dispositivo) ---
    const loadPlayers = () => {
        try { return JSON.parse(localStorage.getItem('pp_players')); } catch (e) { return null; }
    };
    state.players = loadPlayers() || { p1: 'Jugador 1', p2: 'Jugador 2' };
    const P1 = () => state.players.p1;
    const P2 = () => state.players.p2;
    const savePlayers = () => localStorage.setItem('pp_players', JSON.stringify(state.players));
    // Devuelve [actor, receptor] al azar usando los nombres reales
    const randomPair = () => Math.random() > 0.5 ? [P1(), P2()] : [P2(), P1()];

    // --- Intensidad: sin filtro. Siempre se usan TODAS las intensidades ---
    state.intensity = 'todos';

    // Clasificador automático por palabras clave (para el contenido sin etiqueta .level)
    const SUAVE_KW = ['suave', 'pausad', 'ternura', 'lento', 'relaj', 'romántic', 'romantic', 'abraz', 'susurr', 'caricia', 'masaje', 'mirada', 'dulce', 'tierno', 'tierna', 'reconfort', 'cómod', 'comod', 'beso en la', 'beso en el', 'beso en cada'];
    const EXTREMO_KW = ['desnud', 'oral', 'esclav', 'orgasmo', 'penetrac', 'clítoris', 'clitoris', 'pene', 'flexib', 'acrobat', 'acróbat', 'parada de manos', 'vertical', 'suspendid', 'la vela', 'delfín', 'delfin', 'carretilla', 'handstand', 'nalgada', 'esposas', 'amarr', 'atad', 'venda', 'fuerza', 'salvaje', 'prohibid', 'sin censura', 'fantasía sucia', 'lencería', 'striptease', 'borde del clímax', 'edging'];
    const classifyLevel = (text) => {
        const t = (text || '').toLowerCase();
        if (EXTREMO_KW.some(k => t.includes(k))) return 'extremo';
        if (SUAVE_KW.some(k => t.includes(k))) return 'suave';
        return 'picante';
    };
    const levelOf = (item, textKey) => {
        if (item && typeof item === 'object' && item.level) return item.level;
        const txt = typeof item === 'string' ? item : (item && textKey ? item[textKey] : '');
        return classifyLevel(txt);
    };
    const passIntensity = (lvl) => state.intensity === 'todos' || lvl === state.intensity;
    // Filtra por intensidad; si no queda nada, devuelve el array completo (nunca vacío)
    const filterByIntensity = (arr, textKey) => {
        const f = arr.filter(it => passIntensity(levelOf(it, textKey)));
        return f.length ? f : arr;
    };

    // --- Utilidades de azar / mazos sin repetición ---
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const shuffle = (a) => {
        const r = a.slice();
        for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[r[i], r[j]] = [r[j], r[i]]; }
        return r;
    };
    // Crea un mazo que no repite hasta agotarse; respeta la intensidad activa
    const makeDeck = (getArr, textKey) => {
        let pile = [];
        return () => {
            if (!pile.length) pile = shuffle(filterByIntensity(getArr(), textKey));
            const card = pile.pop();
            return card !== undefined ? card : pick(getArr());
        };
    };

    // --- Beep al terminar el temporizador (Web Audio) ---
    let audioCtx;
    const beep = () => {
        try {
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            const o = audioCtx.createOscillator(), g = audioCtx.createGain();
            o.connect(g); g.connect(audioCtx.destination);
            o.type = 'sine'; o.frequency.value = 880; g.gain.value = 0.15;
            o.start();
            o.frequency.setValueAtTime(660, audioCtx.currentTime + 0.15);
            o.stop(audioCtx.currentTime + 0.32);
        } catch (e) { /* sin audio disponible */ }
    };

    // --- Temporizador circular reutilizable con cuenta regresiva real ---
    const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    const createTimer = (container, seconds) => {
        if (!seconds) { container.innerHTML = ''; return; }
        container.innerHTML = `
            <div class="pp-timer">
              <div class="pp-timer-circle"><span class="pp-timer-label">${fmtTime(seconds)}</span></div>
              <div class="pp-timer-controls">
                <button class="pp-timer-btn pp-timer-play" type="button" aria-label="Iniciar / pausar">▶</button>
                <button class="pp-timer-btn pp-timer-stop" type="button" aria-label="Reiniciar">■</button>
              </div>
            </div>`;
        let remaining = seconds, iv = null;
        const label = container.querySelector('.pp-timer-label');
        const playBtn = container.querySelector('.pp-timer-play');
        const reset = () => { clearInterval(iv); iv = null; remaining = seconds; label.textContent = fmtTime(remaining); playBtn.textContent = '▶'; };
        playBtn.addEventListener('click', () => {
            if (iv) { clearInterval(iv); iv = null; playBtn.textContent = '▶'; return; }
            if (remaining <= 0) remaining = seconds;
            playBtn.textContent = '⏸';
            iv = setInterval(() => {
                remaining--;
                label.textContent = remaining > 0 ? fmtTime(remaining) : '¡Tiempo!';
                if (remaining <= 0) { clearInterval(iv); iv = null; playBtn.textContent = '▶'; beep(); }
            }, 1000);
        });
        container.querySelector('.pp-timer-stop').addEventListener('click', reset);
    };
    // Detecta una duración dentro de un texto ("30 segundos", "2 minutos") -> segundos
    const parseSeconds = (text) => {
        const t = (text || '').toLowerCase();
        let total = 0;
        const min = t.match(/(\d+)\s*minutos?/);
        const seg = t.match(/(\d+)\s*segundos?/);
        if (min) total += parseInt(min[1], 10) * 60;
        if (seg) total += parseInt(seg[1], 10);
        return total;
    };

    // --- Ruleta reutilizable (corrige el bug de rotación que giraba hacia atrás) ---
    const buildWheel = (wheelEl, count) => {
        wheelEl.style.background = `conic-gradient(${Array.from({ length: count }, (_, i) =>
            `${i % 2 === 0 ? '#ff758c' : '#d63031'} ${i * (360 / count)}deg ${(i + 1) * (360 / count)}deg`).join(', ')})`;
        if (typeof wheelEl._rotation !== 'number') wheelEl._rotation = 0;
    };
    const spinWheel = (wheelEl, count, cb) => {
        const extra = (5 + Math.floor(Math.random() * 5)) * 360;
        const stopAt = Math.floor(Math.random() * 360);
        const current = wheelEl._rotation || 0;
        const toZero = (360 - (current % 360)) % 360;     // realinea a 0 antes de sumar (siempre hacia adelante)
        wheelEl._rotation = current + toZero + extra + stopAt;
        wheelEl.style.transform = `rotate(${wheelEl._rotation}deg)`;
        const finalDeg = (360 - (stopAt % 360)) % 360;
        const index = Math.floor(finalDeg / (360 / count)) % count;
        setTimeout(() => cb(index), 4200);
    };

    // --- Tiempo coherente con la dificultad de la posición ---
    const TIME_BY_LEVEL = {
        suave: ['5 minutos', '8 minutos', '10 minutos', '15 minutos'],
        picante: ['3 minutos', '5 minutos', '8 minutos', '10 minutos'],
        extremo: ['1 minuto', '2 minutos', '3 minutos']   // posiciones exigentes: tiempos cortos y seguros
    };
    const timeForLevel = (lvl) => pick(TIME_BY_LEVEL[lvl] || TIME_BY_LEVEL.picante);

    // --- Combinaciones válidas para los Dados de Acción (estimulador × zona con sentido) ---
    const VALID_STIMULATORS = {
        "Cuello": ["Boca", "Manos", "Lengua", "Labios"],
        "Pechos": ["Boca", "Manos", "Dedos", "Lengua", "Labios"],
        "Espalda": ["Manos", "Dedos", "Lengua", "Boca"],
        "Abdomen": ["Boca", "Manos", "Dedos", "Lengua", "Labios"],
        "Orejas": ["Boca", "Lengua", "Labios"],
        "Nalgas": ["Manos", "Dedos", "Boca", "Labios"],
        "Muslos": ["Manos", "Dedos", "Boca", "Lengua", "Labios", "Piernas"],
        "Zona íntima": ["Boca", "Manos", "Dedos", "Lengua", "Labios"],
        "Pies": ["Manos", "Dedos", "Boca", "Lengua", "Labios"]
    };

    // --- Ruleta Maestra: juegos que exigen roles separados (no pueden ser "ambos a la vez") ---
    const SOLO_GAMES = new Set(["El Observador", "Solo Palabras", "Sin Manos", "Ojos Vendados", "Esclavo de Placer", "Cronómetro Erótico", "Poner a 100"]);

    // ============================================================
    //  MÁS CONTENIDO  (se suma al existente)
    // ============================================================
    data.questions = data.questions.concat([
        { text: "<player1>, mírale los labios a <player2> 5 segundos y luego decídete a besarle... o no.", roles: true },
        { text: "¿<player1>, qué prenda tuya te gustaría que <player2> te arrancara con los dientes?", roles: true },
        { text: "<player1>, dile a <player2> al oído el lugar más raro donde te gustaría intentarlo.", roles: true },
        { text: "¿<player1>, prefieres que <player2> tome el control esta noche o tomarlo tú?", roles: true },
        { text: "<player1>, deja un camino de 3 besos desde la mano de <player2> hasta su cuello.", roles: true },
        { text: "¿<player1>, qué gesto inocente de <player2> te parece secretamente provocador?", roles: true },
        { text: "<player1>, susúrrale a <player2> qué te gustaría que te hiciera primero.", roles: true },
        { text: "¿<player1>, cuál es la parte de <player2> que más te cuesta dejar de mirar?", roles: true }
    ]);

    data.dares = data.dares.concat([
        "Mírale a los ojos a tu pareja y describe en voz baja lo que harías si nadie los viera.",
        "Dale un masaje lento en la nuca mientras le hablas al oído por 1 minuto.",
        "Quítate una prenda y úsala para acariciar el cuello de tu pareja.",
        "Dale 3 besos en el cuello subiendo lentamente hasta la oreja.",
        "Baila pegado a tu pareja una canción lenta entera, sin separarse.",
        "Recorre con un dedo la columna de tu pareja, de abajo a arriba, muy despacio."
    ]);

    // ============================================================
    //  JUEGO NUEVO: JENGA PICANTE  (retos por ficha, pueden repetirse)
    // ============================================================
    // 36 retos (los <player1>/<player2> se reemplazan por los nombres reales al jugar).
    // Balance pensado para "subir la temperatura": más picantes y extremos que suaves.
    const JENGA_CHALLENGES = [
        // --- SUAVE (8) ---
        { text: "Dale un beso en el cuello a tu pareja.", level: "suave" },
        { text: "Hazle un cumplido muy sincero mirándole a los ojos.", level: "suave" },
        { text: "Dale un masaje de 30 segundos en los hombros.", level: "suave" },
        { text: "Abraza a tu pareja por la espalda y susúrrale algo lindo.", level: "suave" },
        { text: "Dale un beso en la mano, otro en la mejilla y otro en la frente.", level: "suave" },
        { text: "Acaricia el rostro de tu pareja mientras la miras 15 segundos.", level: "suave" },
        { text: "Dile al oído tu recuerdo favorito juntos.", level: "suave" },
        { text: "Dale un masaje lento en la nuca mientras le hablas al oído por 1 minuto.", level: "suave" },
        // --- PICANTE (14) ---
        { text: "Bésame donde yo te diga (tú eliges la zona).", level: "picante" },
        { text: "Siéntate en el regazo de tu pareja por un turno entero.", level: "picante" },
        { text: "Quítate una prenda de tu elección.", level: "picante" },
        { text: "Dale un beso de 20 segundos sin usar las manos.", level: "picante" },
        { text: "Muerde suavemente el labio inferior de tu pareja.", level: "picante" },
        { text: "Lame o besa el cuello de tu pareja de abajo hacia arriba.", level: "picante" },
        { text: "Dale 5 nalgadas suaves a tu pareja.", level: "picante" },
        { text: "Imita tu posición favorita encima de tu pareja (con ropa) 15 seg.", level: "picante" },
        { text: "Susúrrale al oído una fantasía rápida que tengas con tu pareja.", level: "picante" },
        { text: "<player1>, dale a <player2> un masaje sensual por encima de la ropa durante 1 minuto.", level: "picante" },
        { text: "<player1>, quítale una prenda a <player2> con calma, mirándole a los ojos.", level: "picante" },
        { text: "<player1>, recórrele a <player2> el cuerpo con los dedos, de los muslos al cuello.", level: "picante" },
        { text: "<player1>, siéntate sobre <player2> y muévete despacio durante 20 segundos.", level: "picante" },
        { text: "<player1>, dale a <player2> un beso profundo mientras le sujetas del cabello.", level: "picante" },
        // --- EXTREMO (14) ---
        { text: "Dale un beso provocativo en cada lado del pecho.", level: "extremo" },
        { text: "Quítale una prenda a tu pareja usando solo la boca.", level: "extremo" },
        { text: "Haz un baile sensual de 60 segundos en el regazo de tu pareja.", level: "extremo" },
        { text: "Lleva a tu pareja al borde del orgasmo usando solo tus manos por 45 segundos.", level: "extremo" },
        { text: "Confiesa la fantasía más atrevida que quieres probar hoy.", level: "extremo" },
        { text: "Quédate solo en ropa interior hasta tu próximo turno.", level: "extremo" },
        { text: "<player1>, tócate mientras <player2> te observa de cerca durante 2 minutos.", level: "extremo" },
        { text: "<player1>, dale placer oral a <player2> (con o sin ropa) durante 1 minuto.", level: "extremo" },
        { text: "<player1>, deja que <player2> te dé 3 órdenes atrevidas y cúmplelas.", level: "extremo" },
        { text: "<player1>, lámele a <player2> el cuerpo desde el ombligo hacia abajo.", level: "extremo" },
        { text: "<player1>, estimula a <player2> con la boca donde te pida durante 1 minuto.", level: "extremo" },
        { text: "<player1> y <player2>: bésense con desesperación mientras cada uno se quita una prenda.", level: "extremo" },
        { text: "<player1>, susúrrale a <player2> al oído lo que le harás esta noche, con detalle.", level: "extremo" },
        { text: "<player1>, recuéstate y deja que <player2> haga contigo lo que quiera por 1 minuto.", level: "extremo" }
    ];

    // ============================================================
    //  JUEGO NUEVO: CARRERA DEL DURAZNO  (tablero + cartas + promesa)
    // ============================================================
    // Tablero en bucle con forma de durazno (la casilla 0 es Salida/Meta).
    // 8 categorías de carta, cada una con su mazo de 6 (48 cartas en total).
    // 48 casillas: la 0 es Salida/Meta, el resto cicla las 8 categorías (variado y colorido)
    const DURAZNO_PATTERN = ['reto', 'pregunta', 'bonus', 'reto', 'castigo', 'pregunta', 'salvacion', 'reto', 'penitencia', 'bonus', 'escudo', 'reto', 'castigo', 'pregunta', 'bonus', 'promesa'];
    const DURAZNO_BOARD = [{ cat: 'salida' }].concat(
        Array.from({ length: 47 }, (_, i) => ({ cat: DURAZNO_PATTERN[i % DURAZNO_PATTERN.length] }))
    );
    const DURAZNO_META = {
        salida: { label: 'Salida / Meta', emoji: '🏁' },
        reto: { label: 'Reto', emoji: '🔥' },
        pregunta: { label: 'Pregunta', emoji: '💬' },
        penitencia: { label: 'Penitencia', emoji: '😈' },
        castigo: { label: 'Castigo', emoji: '⛓️' },
        bonus: { label: 'Bonus', emoji: '⭐' },
        salvacion: { label: 'Salvación', emoji: '🍀' },
        escudo: { label: 'Escudo', emoji: '🛡️' },
        promesa: { label: 'Promesa', emoji: '🤞' },
        resultado: { label: 'Resultado', emoji: '🏆' }
    };
    // 12 cartas por mazo (96 en total). Cartas con sexo: { m: "...", f: "..." }
    //   m = texto cuando juega el 🍆 hombre (turno 0)  ·  f = cuando juega la 🍑 mujer (turno 1)
    // Las cartas neutras usan { text: "..." }. Mucho más picante/extremo para subir la presión.
    const DURAZNO_CARDS = {
        reto: [
            { text: "Dale un beso largo y lento en el cuello a tu pareja.", level: "suave" },
            { text: "Dale un masaje sensual a tu pareja durante 3 minutos.", level: "suave" },
            { text: "Quítate una prenda ahora mismo y déjala caer despacio.", level: "picante" },
            { text: "Siéntate sobre tu pareja y muévete despacio durante 20 segundos.", level: "picante" },
            { m: "Pasa tus manos por los pechos de tu pareja por encima de la ropa 20 seg.", f: "Pasa tus manos por el pecho y el abdomen de tu pareja 20 seg.", level: "picante" },
            { text: "Pasa tu lengua por el cuello y el pecho de tu pareja.", level: "picante" },
            { text: "Dale a tu pareja un beso profundo mientras le sujetas del cabello.", level: "picante" },
            { f: "Restriega tus pechos en la cara de tu pareja durante 20 segundos.", m: "Restriega tu pecho desnudo contra el de tu pareja durante 20 segundos.", level: "extremo" },
            { text: "Quítale una prenda a tu pareja usando solo la boca.", level: "extremo" },
            { m: "Acaricia entre las piernas de tu pareja hasta que ella te lo pida.", f: "Acaricia entre las piernas de tu pareja hasta que él te lo pida.", level: "extremo" },
            { text: "Dale placer oral a tu pareja (con o sin ropa) durante 1 minuto.", level: "extremo" },
            { text: "Lleva a tu pareja al borde usando solo tus manos por 45 segundos.", level: "extremo" }
        ],
        pregunta: [
            { text: "¿Qué fue lo primero que te atrajo de mí?", level: "suave" },
            { text: "¿Cuál es tu recuerdo más tierno conmigo?", level: "suave" },
            { text: "¿Cuál es tu parte favorita de mi cuerpo? Señálala y bésala.", level: "picante" },
            { text: "¿Dónde te gustaría que te besara ahora mismo? Hazlo.", level: "picante" },
            { text: "¿Prefieres llevar el control o que yo lo lleve esta noche?", level: "picante" },
            { text: "¿Qué es lo más atrevido que has pensado de mí hoy? Descríbelo.", level: "picante" },
            { text: "¿Qué prenda mía te gustaría arrancarme ahora mismo?", level: "picante" },
            { text: "¿Qué sonido mío te excita más? Pídeme que lo haga.", level: "picante" },
            { text: "¿Qué fantasía te mueres por cumplir conmigo? Cuéntala con detalle.", level: "extremo" },
            { text: "¿Qué te gustaría que te hiciera con la boca? Susúrralo.", level: "extremo" },
            { text: "¿Cuál es el lugar más atrevido donde te gustaría que lo hiciéramos?", level: "extremo" },
            { text: "¿Qué orden atrevida me darías ahora mismo? Dímela y la cumplo.", level: "extremo" }
        ],
        penitencia: [
            { text: "Mantén la mirada fija en tu pareja 30 segundos sin reír.", level: "suave" },
            { text: "Habla solo en susurros sensuales durante 2 turnos.", level: "suave" },
            { text: "No puedes tocar a tu pareja hasta tu próximo turno, aunque te provoque.", level: "picante" },
            { text: "Imita tu sonido favorito de placer durante 10 segundos.", level: "picante" },
            { text: "Dale 5 besos mojados donde tu pareja elija.", level: "picante" },
            { m: "Acaricia los pechos de tu pareja hasta que ella te diga basta.", f: "Acaricia el pecho y el abdomen de tu pareja hasta que él te diga basta.", level: "picante" },
            { text: "Déjale a tu pareja una marca con un beso en el cuello.", level: "picante" },
            { text: "Quédate en ropa interior toda la partida.", level: "extremo" },
            { f: "Restriega tus pechos en la cara de tu pareja durante 20 segundos.", m: "Restriega tu pecho desnudo contra la espalda de tu pareja 20 seg.", level: "extremo" },
            { text: "Dale placer oral a tu pareja durante 30 segundos.", level: "extremo" },
            { m: "Estimula con la boca los pechos de tu pareja durante 30 segundos.", f: "Estimula con la boca el cuello y el pecho de tu pareja 30 seg.", level: "extremo" },
            { text: "Deja que tu pareja te use a su antojo durante 1 minuto.", level: "extremo" }
        ],
        castigo: [
            { text: "¡Retrocede 2! Dale un beso largo a tu pareja.", level: "suave", move: -2 },
            { text: "¡Retrocede 2! Dale a tu pareja un masaje en los genitales por 1 minuto.", level: "suave", move: -2 },
            { text: "¡Retrocede 1! Confiesa un antojo atrevido que tengas ahora.", level: "picante", move: -1 },
            { text: "¡Retrocede 2! Recibe 5 nalgadas/bofetadas suaves de tu pareja.", level: "picante", move: -2 },
            { text: "¡Retrocede 3! Deja que tu pareja te dé una orden y cúmplela.", level: "picante", move: -3 },
            { m: "¡Retrocede 2! Bésale y lámele los pechos a tu pareja 20 seg.", f: "¡Retrocede 2! Bésale y lámele el pecho y el cuello a tu pareja 20 seg.", level: "picante", move: -2 },
            { text: "¡Retrocede 1! Gime el nombre de tu pareja al oído.", level: "picante", move: -1 },
            { text: "¡Retrocede 2! Deja que tu pareja te toque donde quiera por 30 segundos.", level: "picante", move: -2 },
            { text: "¡Retrocede 3! Quítate una prenda y déjala fuera por 2 turnos.", level: "extremo", move: -3 },
            { f: "¡Retrocede 2! Restriega tus pechos en la cara de tu pareja 15 seg.", m: "¡Retrocede 2! Restriega tu entrepierna contra tu pareja 15 seg.", level: "extremo", move: -2 },
            { text: "¡Retrocede 3! Dale placer oral a tu pareja por 30 segundos.", level: "extremo", move: -3 },
            { m: "¡Retrocede 2! Acaricia entre las piernas de tu pareja hasta que ella jadee.", f: "¡Retrocede 2! Acaricia entre las piernas de tu pareja hasta que él jadee.", level: "extremo", move: -2 }
        ],
        bonus: [
            { text: "¡Suerte! Avanza 2 casillas y recibe un beso.", level: "suave", move: 2 },
            { text: "¡Avanza 1 y recibe un abrazo de oso bien apretado!", level: "suave", move: 1 },
            { text: "¡Avanza 1 y róbale un beso profundo a tu pareja!", level: "picante", move: 1 },
            { text: "¡Avanza 2! Elige dónde te besa tu pareja ahora.", level: "picante", move: 2 },
            { text: "¡Avanza 2! Tu pareja te dedica un piropo subido de tono.", level: "picante", move: 2 },
            { text: "¡Avanza 3! La pasión te impulsa.", level: "picante", move: 3 },
            { m: "¡Avanza 2! Tu pareja te deja acariciarle los pechos 15 seg.", f: "¡Avanza 2! Tu pareja te deja acariciarle el pecho 15 seg.", level: "picante", move: 2 },
            { text: "¡Avanza 1! Quítale una prenda a tu pareja.", level: "picante", move: 1 },
            { text: "¡Avanza 2! Recibe un masaje sensual de 1 minuto.", level: "picante", move: 2 },
            { text: "¡Avanza 3! Tu pareja te debe un placer oral de 30 seg al terminar.", level: "extremo", move: 3 },
            { f: "¡Avanza 2! Restriega tus pechos en tu pareja como premio 15 seg.", m: "¡Avanza 2! Restriégate contra tu pareja como premio 15 seg.", level: "extremo", move: 2 },
            { text: "¡Avanza 3! Tu pareja cumple una fantasía tuya al final del juego.", level: "extremo", move: 3 }
        ],
        salvacion: [
            { text: "¡Trébol de la suerte! Ganas un escudo contra el próximo castigo.", level: "suave", shield: true },
            { text: "¡Protección! El siguiente retroceso no te afecta.", level: "suave", shield: true },
            { text: "¡Salvada! Guarda este escudo para tu próximo castigo.", level: "suave", shield: true },
            { text: "¡Suerte! Un escudo te cubre del próximo castigo.", level: "suave", shield: true },
            { text: "¡Amuleto! Anula el siguiente castigo que te toque.", level: "suave", shield: true },
            { text: "¡Escudo de pasión! El próximo retroceso lo esquivas.", level: "suave", shield: true },
            { text: "¡Ángel guardián! Bloqueas el próximo retroceso.", level: "suave", shield: true },
            { text: "¡Buena estrella! El siguiente castigo no te toca.", level: "suave", shield: true },
            { text: "¡Talismán! Esquivas el próximo retroceso.", level: "suave", shield: true },
            { text: "¡Fortuna! Guarda un escudo para cuando lo necesites.", level: "suave", shield: true },
            { text: "¡Bendición! El próximo castigo rebota.", level: "suave", shield: true },
            { text: "¡Coraza! Te proteges del siguiente retroceso.", level: "suave", shield: true }
        ],
        escudo: [
            { text: "🛡️ Escudo activado: bloquea tu próximo castigo.", level: "suave", shield: true },
            { text: "🛡️ Te blindas: el siguiente retroceso no cuenta.", level: "suave", shield: true },
            { text: "🛡️ Coraza del amor: anula el próximo castigo.", level: "suave", shield: true },
            { text: "🛡️ Barrera: tu próximo castigo se cancela.", level: "suave", shield: true },
            { text: "🛡️ Inmunidad: esquivas el siguiente retroceso.", level: "suave", shield: true },
            { text: "🛡️ Refuerzo: guardas un escudo para más tarde.", level: "suave", shield: true },
            { text: "🛡️ Armadura: el próximo castigo no te frena.", level: "suave", shield: true },
            { text: "🛡️ Muralla: detienes el siguiente retroceso.", level: "suave", shield: true },
            { text: "🛡️ Burbuja: el próximo castigo rebota.", level: "suave", shield: true },
            { text: "🛡️ Defensa total: anulas el siguiente retroceso.", level: "suave", shield: true },
            { text: "🛡️ Blindaje: tu próximo castigo se esfuma.", level: "suave", shield: true },
            { text: "🛡️ Resguardo: guardas un escudo para tu próximo castigo.", level: "suave", shield: true }
        ],
        promesa: [
            { text: "Recuérdale a tu pareja la promesa que cumplirá si pierde.", level: "suave" },
            { text: "Promete en voz alta un mimo extra para esta noche.", level: "suave" },
            { text: "Hagan una mini-promesa: un beso largo al terminar el juego.", level: "suave" },
            { text: "Mírense y prometan una cita sorpresa esta semana.", level: "suave" },
            { text: "Prometan terminar la noche abrazados sin importar quién gane.", level: "suave" },
            { text: "Promete cumplir un antojo de tu pareja hoy.", level: "picante" },
            { text: "Promete un masaje completo al perdedor… o al ganador.", level: "picante" },
            { text: "Promete cumplir una fantasía de tu pareja si pierdes.", level: "picante" },
            { text: "Promete quitarte una prenda en tu próximo turno.", level: "picante" },
            { text: "Prométele a tu pareja un beso en el lugar que ella elija.", level: "picante" },
            { text: "Promete una noche entera a disposición de tu pareja si pierdes.", level: "extremo" },
            { text: "Promete cumplir cualquier orden de tu pareja durante 10 minutos si pierdes.", level: "extremo" }
        ]
    };

    // ============================================================
    //  AJUSTES (modal de nombres) — sin selector de intensidad
    // ============================================================
    const setupOverlay = document.getElementById('setup-overlay');
    const openSetup = () => {
        document.getElementById('setup-name-1').value = P1() === 'Jugador 1' ? '' : P1();
        document.getElementById('setup-name-2').value = P2() === 'Jugador 2' ? '' : P2();
        setupOverlay.style.display = 'flex';
    };
    document.getElementById('config-btn').addEventListener('click', openSetup);
    setupOverlay.addEventListener('click', (e) => { if (e.target === setupOverlay) setupOverlay.style.display = 'none'; });
    document.getElementById('setup-save').addEventListener('click', () => {
        const n1 = document.getElementById('setup-name-1').value.trim();
        const n2 = document.getElementById('setup-name-2').value.trim();
        state.players = { p1: n1 || 'Jugador 1', p2: n2 || 'Jugador 2' };
        savePlayers();
        setupOverlay.style.display = 'none';
        if (state.currentView === 'home') renderView('home');
    });

    // --- View Rendering ---
    const renderView = (viewName) => {
        state.currentView = viewName;

        // Find template
        const templateId = `view-${viewName}`;
        const template = document.getElementById(templateId);

        if (!template) {
            console.error(`Template ${templateId} not found`);
            return;
        }

        // Clear and add content
        contentArea.innerHTML = '';
        const clone = template.content.cloneNode(true);
        contentArea.appendChild(clone);

        // Update Icons
        lucide.createIcons();

        // Attach event listeners for the new view
        attachViewListeners(viewName);
    };

    const attachViewListeners = (viewName) => {
        if (viewName === 'home') {
            document.querySelectorAll('.game-card').forEach(card => {
                card.addEventListener('click', () => renderView(card.dataset.game));
            });
            // Saludo con nombres
            const greeting = document.getElementById('home-greeting');
            if (greeting && (P1() !== 'Jugador 1' || P2() !== 'Jugador 2')) {
                greeting.textContent = `${P1()} y ${P2()}, elijan un juego para encender la noche.`;
            }
        } else {
            // Back button
            const backBtn = document.querySelector('.back-btn');
            if (backBtn) backBtn.addEventListener('click', () => renderView('home'));

            // Game specific logic
            if (viewName === 'roulette-pos') initRoulettePos();
            if (viewName === 'body-dice') initBodyDice();
            if (viewName === 'spicy-questions') initSpicyQuestions();
            if (viewName === 'dare-punishment') initDarePunishment();
            if (viewName === 'prohibition') initProhibition();
            if (viewName === 'number-dice') initNumberDice();
            if (viewName === 'master-roulette') initMasterRoulette();
            if (viewName === 'jenga') initJenga();
            if (viewName === 'durazno') initDurazno();
        }
    };

    // --- Game Initialization Functions ---

    function initRoulettePos() {
        const btn = document.getElementById('spin-pos-btn');
        const wheel = document.getElementById('pos-wheel');
        const posResult = document.getElementById('pos-result');
        const timeResult = document.getElementById('time-result');
        const posImgContainer = document.getElementById('pos-img-container');
        const posImg = document.getElementById('pos-img');
        const posDesc = document.getElementById('pos-desc');

        const segments = filterByIntensity(data.positions, 'desc');
        buildWheel(wheel, segments.length);

        posImg.loading = 'lazy';
        posImg.addEventListener('error', () => { posImgContainer.style.display = 'none'; });

        btn.addEventListener('click', () => {
            if (state.isRolling) return;
            state.isRolling = true;
            btn.disabled = true;

            spinWheel(wheel, segments.length, (index) => {
                state.isRolling = false;
                btn.disabled = false;

                const selected = segments[index];
                posResult.textContent = selected.name;
                posDesc.textContent = selected.desc;
                // El tiempo ahora corresponde a la dificultad de la posición
                timeResult.textContent = timeForLevel(levelOf(selected, 'desc'));

                if (selected.img) {
                    posImg.src = selected.img;
                    posImgContainer.style.display = 'block';
                } else {
                    posImgContainer.style.display = 'none';
                }

                posResult.classList.add('animate-pop');
                setTimeout(() => posResult.classList.remove('animate-pop'), 500);
            });
        });
    }

    function initBodyDice() {
        const btn = document.getElementById('roll-body-btn');
        const dieLeft = document.getElementById('die-left');
        const dieRight = document.getElementById('die-right');
        const whoLeft = document.getElementById('who-left');
        const whoRight = document.getElementById('who-right');
        const timeContainer = document.getElementById('action-time-container');
        const timeDisplay = document.getElementById('action-time');

        btn.addEventListener('click', () => {
            if (state.isRolling) return;
            state.isRolling = true;
            btn.disabled = true;

            dieLeft.classList.add('rolling');
            dieRight.classList.add('rolling');

            dieLeft.textContent = '?';
            dieRight.textContent = '?';
            whoLeft.textContent = '...';
            whoRight.textContent = '...';
            timeContainer.style.visibility = 'hidden';

            setTimeout(() => {
                state.isRolling = false;
                btn.disabled = false;
                dieLeft.classList.remove('rolling');
                dieRight.classList.remove('rolling');

                // Primero la zona, luego un estimulador que tenga sentido para esa zona
                const zone = pick(data.zones);
                const stim = pick(VALID_STIMULATORS[zone] || data.stimulators);
                dieLeft.textContent = stim;
                dieRight.textContent = zone;

                const [actor, receiver] = randomPair();
                whoLeft.textContent = actor;
                whoRight.textContent = receiver;

                // Tiempo 15s–90s con texto coherente (segundos vs minutos)
                const totalSeconds = (Math.floor(Math.random() * 6) + 1) * 15;
                timeDisplay.textContent = totalSeconds < 60
                    ? `Durante ${totalSeconds} segundos`
                    : `Durante ${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')} minutos`;
                timeContainer.style.visibility = 'visible';

                lucide.createIcons();
            }, 1000);
        });
    }

    const initSpicyQuestions = () => {
        const questionText = document.getElementById('question-text');
        const nextBtn = document.getElementById('next-question');
        const drawQuestion = makeDeck(() => data.questions, 'text');

        const showQuestion = () => {
            const q = drawQuestion();
            const [p1, p2] = randomPair();
            const finalText = q.text.replace(/<player1>/g, p1).replace(/<player2>/g, p2);
            questionText.innerHTML = `<div class="question-roles"><span class="role-badge">${p1}</span> pregunta a <span class="role-badge">${p2}</span></div><p class="main-question">${finalText}</p>`;
        };

        const advance = () => {
            questionText.style.opacity = '0';
            setTimeout(() => {
                showQuestion();
                questionText.style.opacity = '1';
            }, 300);
        };

        if (nextBtn) nextBtn.addEventListener('click', advance);

        // Los botones Sí / No / Tal vez ahora responden y pasan a la siguiente
        document.querySelectorAll('.spicy-card .action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.add('picked');
                setTimeout(() => btn.classList.remove('picked'), 350);
                advance();
            });
        });

        // Pregunta inicial
        showQuestion();
    };

    function initDarePunishment() {
        if (typeof state.dareTurnIdx !== 'number') state.dareTurnIdx = 0;
        let isPunishmentMode = false;
        const drawDare = makeDeck(() => data.dares, null);
        const drawPunish = makeDeck(() => data.punishments, null);

        const btnNewDare = document.getElementById('btn-new-dare');
        const btnManualPunish = document.getElementById('btn-manual-punish');
        const btnYes = document.getElementById('btn-dare-yes');
        const btnNo = document.getElementById('btn-dare-no');

        const turnText = document.getElementById('dare-turn-text');
        const resultText = document.getElementById('dare-result');
        const verifyArea = document.getElementById('dare-verification');
        const verifyText = document.getElementById('verify-text');

        const challenger = () => state.dareTurnIdx === 0 ? P1() : P2();
        const receiver = () => state.dareTurnIdx === 0 ? P2() : P1();

        const updateTurnDisplay = () => {
            turnText.innerHTML = `<span class="role-badge">${challenger()}</span> reta a <span class="role-badge">${receiver()}</span>`;
        };

        const showNewDare = () => {
            isPunishmentMode = false;
            resultText.innerHTML = `<span style="color:var(--primary-red); font-weight:800;">RETO:</span> ${drawDare()}`;
            verifyText.textContent = "¿Se cumplió el reto?";
            btnNo.style.display = 'inline-block';
            verifyArea.style.display = 'block';
            resultText.style.opacity = '1';
        };

        const showPunishment = (direct = false) => {
            isPunishmentMode = true;
            const prefix = direct ? '<span style="color:var(--text-dark); font-weight:800;">CASTIGO DIRECTO:</span>' : '<span style="color:var(--passion-red); font-weight:800;">¡NO CUMPLIDO! CASTIGO:</span>';
            resultText.innerHTML = `${prefix} ${drawPunish()}`;
            verifyText.textContent = "¿Se cumplió el castigo?";
            btnNo.style.display = 'none'; // Hay que cumplir el castigo para avanzar
            verifyArea.style.display = 'block';
            resultText.style.opacity = '1';
        };

        const nextTurn = () => {
            state.dareTurnIdx = state.dareTurnIdx === 0 ? 1 : 0;
            updateTurnDisplay();
            verifyArea.style.display = 'none';
            resultText.innerHTML = "Pulsa en 'NUEVO RETO' para el siguiente turno...";
        };

        btnNewDare.addEventListener('click', () => {
            resultText.style.opacity = '0';
            setTimeout(showNewDare, 300);
        });

        btnManualPunish.addEventListener('click', () => {
            resultText.style.opacity = '0';
            setTimeout(() => showPunishment(true), 300);
        });

        btnYes.addEventListener('click', () => {
            resultText.innerHTML = `<span style="color:green; font-weight:800; font-size: 1.5rem;">¡${isPunishmentMode ? 'CASTIGO' : 'RETO'} CUMPLIDO!</span>`;
            verifyArea.style.display = 'none';
            setTimeout(nextTurn, 1500);
        });

        btnNo.addEventListener('click', () => {
            if (!isPunishmentMode) {
                resultText.style.opacity = '0';
                setTimeout(() => showPunishment(false), 300);
            }
        });

        updateTurnDisplay();
    }

    function initProhibition() {
        const btn = document.getElementById('spin-prohibit-btn');
        const wheel = document.getElementById('prohibit-wheel');
        const turnText = document.getElementById('prohibit-turn-text');
        const instructionText = document.getElementById('prohibit-instruction');
        const targetResult = document.getElementById('prohibit-target');
        const timerResult = document.getElementById('prohibit-time');

        const segments = data.prohibitions;
        buildWheel(wheel, segments.length);

        btn.addEventListener('click', () => {
            if (state.isRolling) return;
            state.isRolling = true;
            btn.disabled = true;

            const [actor, receiver] = randomPair();

            spinWheel(wheel, segments.length, (index) => {
                state.isRolling = false;
                btn.disabled = false;

                const prohibitedZone = segments[index];

                // Mapeo anatómico para la consigna
                const regionMapping = {
                    "Labios": "la cara y el cuello",
                    "Cuello": "la parte superior del pecho y hombros",
                    "Pechos": "todo el torso y el vientre",
                    "Zona Íntima": "toda la zona pélvica y los muslos",
                    "Orejas": "toda la cabeza y el rostro",
                    "Muslos": "la parte inferior de las piernas y pies"
                };
                const region = regionMapping[prohibitedZone] || "todo el cuerpo";

                const templates = [
                    `Debes complacer y estimular toda la zona de <strong>${region}</strong> de tu pareja SIN tocar su:`,
                    `Explora y acaricia apasionadamente <strong>${region}</strong> pero mantente lejos de su:`,
                    `Enfócate en dar placer intenso en <strong>${region}</strong> pero bajo ningún concepto toques su:`
                ];

                turnText.innerHTML = `<span class="role-badge">${actor}</span> acaricia a <span class="role-badge">${receiver}</span>`;
                instructionText.innerHTML = pick(templates);
                targetResult.textContent = prohibitedZone.toUpperCase();
                timerResult.textContent = `Por ${pick([1, 2, 3, 5, 8])} minutos`;
            });
        });
    }

    function initNumberDice() {
        const btn = document.getElementById('roll-numbers-btn');
        const d1 = document.getElementById('num-die-1');
        const d2 = document.getElementById('num-die-2');
        const winner = document.getElementById('dice-winner');

        btn.addEventListener('click', () => {
            if (state.isRolling) return;
            state.isRolling = true;
            btn.disabled = true;

            d1.classList.add('rolling');
            d2.classList.add('rolling');
            winner.textContent = "¡Girando!";

            setTimeout(() => {
                state.isRolling = false;
                btn.disabled = false;
                d1.classList.remove('rolling');
                d2.classList.remove('rolling');

                const v1 = Math.floor(Math.random() * 6) + 1;
                const v2 = Math.floor(Math.random() * 6) + 1;

                d1.textContent = v1;
                d2.textContent = v2;

                if (v1 > v2) winner.textContent = `¡Gana ${P1()}! Manda esta ronda.`;
                else if (v2 > v1) winner.textContent = `¡Gana ${P2()}! Manda esta ronda.`;
                else winner.textContent = "¡Empate! Tiren otra vez.";
            }, 1000);
        });
    }

    function initMasterRoulette() {
        const btn = document.getElementById('spin-master-btn');
        const wheel = document.getElementById('master-wheel');
        const gameResult = document.getElementById('master-game-result');
        const actorResult = document.getElementById('master-actor-result');
        const descResult = document.getElementById('master-game-desc');
        const iconContainer = document.getElementById('master-icon-container');

        const segments = filterByIntensity(data.masterGames, 'desc');
        buildWheel(wheel, segments.length);

        btn.addEventListener('click', () => {
            if (state.isRolling) return;
            state.isRolling = true;
            btn.disabled = true;

            spinWheel(wheel, segments.length, (index) => {
                state.isRolling = false;
                btn.disabled = false;

                const selected = segments[index];
                gameResult.textContent = selected.text.toUpperCase();
                descResult.textContent = selected.desc;

                iconContainer.innerHTML = `<i data-lucide="${selected.icon}" size="48"></i>`;
                lucide.createIcons();

                const [a, b] = randomPair();
                const actors = [
                    `<span class="role-badge">${a}</span> a <span class="role-badge">${b}</span>`,
                    `<span class="role-badge">${b}</span> a <span class="role-badge">${a}</span>`
                ];
                // Los juegos que exigen roles separados no permiten "ambos a la vez"
                if (!SOLO_GAMES.has(selected.text)) actors.push(`<span class="role-badge">AMBOS</span> al mismo tiempo`);
                actorResult.innerHTML = pick(actors);

                gameResult.classList.add('animate-pop');
                setTimeout(() => gameResult.classList.remove('animate-pop'), 500);
            });
        });
    }

    // ============================================================
    //  JENGA PICANTE  (torre 3D girable + medidor de riesgo)
    // ============================================================
    function initJenga() {
        const tower = document.getElementById('jenga-tower');
        const stage = document.getElementById('jenga-stage');
        const turnText = document.getElementById('jenga-turn-text');
        const riskFill = document.getElementById('jenga-risk-fill');
        const riskLabel = document.getElementById('jenga-risk-label');
        const card = document.getElementById('jenga-card');
        const cardTag = document.getElementById('jenga-card-tag');
        const cardText = document.getElementById('jenga-card-text');
        const cardTimer = document.getElementById('jenga-card-timer');
        const cardDone = document.getElementById('jenga-card-done');
        const resetBtn = document.getElementById('jenga-reset');
        const hint = document.querySelector('.jenga-hint');
        const riskWrap = document.querySelector('.jenga-risk');

        const LEVELS = 18, PER = 3, L = 132, S = 44, H = 19;   // 18 niveles x 3 = 54 fichas (Jenga real)
        const TOWER_PIECES = LEVELS * PER;                      // 54
        let removed, turnIdx = 0, fallen, busy, rotX, rotY;
        let jengaDeck = [];

        const curName = () => turnIdx === 0 ? P1() : P2();

        // Mazo de 54 retos para la torre: cada reto único al menos una vez (36),
        // y las casillas restantes se rellenan repitiendo picantes/extremos (máx 2 c/u).
        function buildJengaDeck() {
            const pool = filterByIntensity(JENGA_CHALLENGES, 'text');
            const deck = pool.slice();                          // cada reto una vez
            const spicy = pool.filter(c => c.level !== 'suave');
            const extras = shuffle(spicy.length ? spicy : pool);
            let i = 0;
            while (deck.length < TOWER_PIECES) { deck.push(extras[i % extras.length]); i++; }
            return shuffle(deck);
        }

        const makeBox = (w, h, d) => {
            const box = document.createElement('div');
            box.className = 'j-box';
            const faces = [
                [w, h, `translateZ(${d / 2}px)`],
                [w, h, `rotateY(180deg) translateZ(${d / 2}px)`],
                [d, h, `rotateY(90deg) translateZ(${w / 2}px)`],
                [d, h, `rotateY(-90deg) translateZ(${w / 2}px)`],
                [w, d, `rotateX(90deg) translateZ(${h / 2}px)`],
                [w, d, `rotateX(-90deg) translateZ(${h / 2}px)`]
            ];
            faces.forEach(([fw, fh, tf]) => {
                const f = document.createElement('div');
                f.className = 'j-face';
                f.style.width = fw + 'px';
                f.style.height = fh + 'px';
                f.style.transform = `translate(-50%,-50%) ${tf}`;
                box.appendChild(f);
            });
            return box;
        };

        const applyRot = () => { tower.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`; };

        // Profundidad hacia la cámara (para saber qué pieza está al frente bajo el dedo)
        const depthOf = (cx, cy, cz) => {
            const rx = rotX * Math.PI / 180, ry = rotY * Math.PI / 180;
            const z1 = -cx * Math.sin(ry) + cz * Math.cos(ry);
            return cy * Math.sin(rx) + z1 * Math.cos(rx);
        };

        const alive = () => [...tower.querySelectorAll('.j-piece')].filter(p => !p._removed);
        const levelCount = (li) => alive().filter(p => p._li === li).length;
        const hasWeightAbove = (li) => alive().some(p => p._li > li);

        // Física LÓGICA (sin azar): la torre cae solo si la jugada deja un nivel
        // con peso encima sin soporte central (0 piezas, o una sola pieza lateral).
        function wouldCollapse(piece) {
            const li = piece._li;
            if (!hasWeightAbove(li)) return false;                 // quitar de arriba nunca tumba
            const rest = alive().filter(p => p._li === li && p !== piece).map(p => p._pi);
            if (rest.length === 0) return true;                    // nivel sin soporte
            if (rest.length === 1 && rest[0] !== 1) return true;   // queda solo un lateral -> se desbalancea
            return false;                                          // queda el centro o dos piezas: estable
        }

        // Inestabilidad real: + por niveles frágiles (1 pieza con peso encima)
        // y + por desbalance lateral (sacar muchas de un mismo lado inclina la torre)
        function computeInstability() {
            let fragile = 0;
            for (let li = 0; li < LEVELS; li++) {
                if (hasWeightAbove(li) && levelCount(li) === 1) fragile++;
            }
            let left = 0, right = 0;
            removed.forEach(k => { const pi = +k.split('-')[1]; if (pi === 0) left++; else if (pi === 2) right++; });
            const imbalance = Math.abs(left - right);
            return Math.min(100, Math.round(removed.size * 3 + fragile * 15 + imbalance * 8));
        }
        const updateRiskBar = () => {
            const g = computeInstability();
            riskFill.style.width = g + '%';
            riskLabel.textContent = `Inestabilidad: ${g}%`;
        };
        // Probabilidad de caída por banda de inestabilidad (la torre puede temblar aun "estable")
        const fallChance = (inst) => inst < 35 ? 1 / 100 : inst < 50 ? 1 / 49 : inst < 75 ? 1 / 20 : 1 / 10;

        // Pieza más al frente bajo un punto; si no hay ninguna justo debajo, la más cercana
        function frontPieceAt(x, y) {
            let best = null, bestD = -Infinity;
            let near = null, nearDist = Infinity;
            alive().forEach(p => {
                const r = p.getBoundingClientRect();
                const cxp = (r.left + r.right) / 2, cyp = (r.top + r.bottom) / 2;
                const dist = Math.hypot(x - cxp, y - cyp);
                if (dist < nearDist) { nearDist = dist; near = p; }
                if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
                    const d = depthOf(p._cx, p._cy, p._cz);
                    if (d > bestD) { bestD = d; best = p; }
                }
            });
            if (best) return best;
            return nearDist < 48 ? near : null;   // respaldo si tocaste muy cerca
        }

        // Resalta la pieza candidata: azul (jugador 1) o rosa (jugador 2)
        function setHighlight(piece) {
            tower.querySelectorAll('.j-piece.hot').forEach(p => p.classList.remove('hot', 'hot-p1', 'hot-p2'));
            if (piece && !piece._removed && !busy && !fallen) {
                piece.classList.add('hot', turnIdx === 0 ? 'hot-p1' : 'hot-p2');
            }
        }

        function build() {
            removed = new Set(); fallen = false; busy = false;
            jengaDeck = buildJengaDeck();
            rotX = -20; rotY = 26;
            tower.innerHTML = '';
            tower.classList.remove('collapsing');
            const totalH = LEVELS * H;
            for (let li = 0; li < LEVELS; li++) {
                const even = li % 2 === 0;
                const y = (totalH / 2) - (li * H) - H / 2;
                for (let pi = 0; pi < PER; pi++) {
                    const off = (pi - 1) * S;
                    const w = even ? L : S, h = H;
                    const cx = even ? 0 : off, cz = even ? off : 0;
                    const piece = document.createElement('div');
                    piece.className = 'j-piece';
                    piece.style.width = w + 'px';
                    piece.style.height = h + 'px';
                    piece.style.marginLeft = (-w / 2) + 'px';
                    piece.style.marginTop = (-h / 2) + 'px';
                    const home = `translate3d(${cx}px, ${y}px, ${cz}px)`;
                    piece.style.transform = home;
                    piece._home = home; piece._even = even; piece._off = off;
                    piece._li = li; piece._pi = pi; piece._key = li + '-' + pi;
                    piece._cx = cx; piece._cy = y; piece._cz = cz;
                    piece.appendChild(even ? makeBox(L, H, S) : makeBox(S, H, L));
                    tower.appendChild(piece);
                }
            }
            applyRot();
            updateRiskBar();
            turnText.innerHTML = `Turno de <span class="role-badge">${curName()}</span>`;
            card.style.display = 'none';
            resetBtn.style.display = 'none';
            stage.style.display = '';
            if (hint) hint.style.display = '';
            if (riskWrap) riskWrap.style.display = '';
        }

        function pull(piece) {
            if (busy || fallen || piece._removed) return;
            setHighlight(null);
            busy = true;
            // Caída segura si la jugada deja un nivel sin soporte...
            if (wouldCollapse(piece)) return collapse();
            // ...y caída posible por azar según la inestabilidad (como en el juego real)
            if (Math.random() < fallChance(computeInstability())) return collapse();
            piece._removed = true;
            removed.add(piece._key);
            const out = piece._even
                ? `translateZ(${piece._off >= 0 ? 190 : -190}px)`
                : `translateX(${piece._off >= 0 ? 190 : -190}px)`;
            piece.style.transition = 'transform .6s ease, opacity .6s';
            piece.style.transform = `${piece._home} ${out}`;
            piece.style.opacity = '0';
            updateRiskBar();
            showCard();
        }

        function showCard() {
            if (!jengaDeck.length) jengaDeck = buildJengaDeck();
            const ch = jengaDeck.pop();
            const other = turnIdx === 0 ? P2() : P1();
            const txt = ch.text.replace(/<player1>/g, curName()).replace(/<player2>/g, other);
            cardTag.textContent = 'RETO · ' + curName().toUpperCase();
            cardTag.className = 'jenga-card-tag lvl-' + (ch.level || 'picante');
            cardText.textContent = txt;
            const secs = parseSeconds(txt);
            if (secs) createTimer(cardTimer, secs); else cardTimer.innerHTML = '';
            cardDone.style.display = '';
            cardDone.textContent = '¡HECHO!';
            card.style.display = 'block';
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        cardDone.addEventListener('click', () => {
            if (fallen) return;
            card.style.display = 'none';
            turnIdx = turnIdx === 0 ? 1 : 0;
            turnText.innerHTML = `Turno de <span class="role-badge">${curName()}</span>`;
            busy = false;
        });

        function collapse() {
            fallen = true;
            setHighlight(null);
            tower.classList.add('collapsing');
            tower.querySelectorAll('.j-piece').forEach((p, i) => {
                const dx = (Math.random() * 2 - 1) * 90, rot = (Math.random() * 2 - 1) * 80;
                p.style.transition = `transform .9s cubic-bezier(.4,0,1,1) ${i * 6}ms, opacity .9s ${i * 6}ms`;
                p.style.transform = `${p._home} translate3d(${dx}px, 360px, 0px) rotate(${rot}deg)`;
                p.style.opacity = '0';
            });
            setTimeout(() => {
                // Oculta la torre para que la tarjeta quede limpia
                stage.style.display = 'none';
                if (hint) hint.style.display = 'none';
                if (riskWrap) riskWrap.style.display = 'none';
                const loser = curName();
                cardTag.textContent = '💥 ¡SE CAYÓ LA TORRE!';
                cardTag.className = 'jenga-card-tag lvl-extremo';
                cardText.innerHTML = `<strong>${loser}</strong> tumbó la torre y cumple la penitencia:<br><br>${pick(filterByIntensity(data.punishments, null))}`;
                cardDone.style.display = 'none';
                card.style.display = 'block';
                resetBtn.style.display = '';
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1000);
        }
        resetBtn.addEventListener('click', build);

        // Arrastrar = girar la torre · Toque corto = sacar la ficha resaltada
        // (puntero unificado: mouse en PC, dedo en celular/tablet, lápiz)
        let dragging = false, lastX = 0, lastY = 0, moved = 0, candidate = null;
        stage.addEventListener('pointerdown', (e) => {
            dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
            candidate = frontPieceAt(e.clientX, e.clientY);
            setHighlight(candidate);
            try { stage.setPointerCapture(e.pointerId); } catch (err) { }
        });
        stage.addEventListener('pointermove', (e) => {
            if (dragging) {
                const dx = e.clientX - lastX, dy = e.clientY - lastY;
                moved += Math.abs(dx) + Math.abs(dy);
                if (moved > 8 && candidate) { setHighlight(null); candidate = null; }  // es un giro
                rotY += dx * 0.4;
                rotX = Math.max(-72, Math.min(6, rotX - dy * 0.3));
                lastX = e.clientX; lastY = e.clientY;
                applyRot();
            } else if (!busy && !fallen) {
                setHighlight(frontPieceAt(e.clientX, e.clientY));   // hover con mouse
            }
        });
        stage.addEventListener('pointerup', (e) => {
            dragging = false;
            if (moved <= 8 && candidate) pull(candidate);
            candidate = null;
            if (e.pointerType !== 'mouse') setHighlight(null);
        });
        stage.addEventListener('pointerleave', () => { if (!dragging) setHighlight(null); });
        stage.addEventListener('pointercancel', () => { dragging = false; candidate = null; setHighlight(null); });

        build();
    }

    // ============================================================
    //  CARRERA DEL DURAZNO  (tablero + cartas + promesa)
    // ============================================================
    function initDurazno() {
        const setup = document.getElementById('durazno-setup');
        const scene = document.getElementById('durazno-scene');
        const startBtn = document.getElementById('durazno-start');
        const boardEl = document.getElementById('durazno-board');
        const viewport = document.getElementById('durazno-viewport');
        const stageEl = document.getElementById('durazno-stage');
        const diceEl = document.getElementById('durazno-dice');
        const rollBtn = document.getElementById('durazno-roll');
        const turnEl = document.getElementById('durazno-turn');
        const p1El = document.getElementById('durazno-p1');
        const p2El = document.getElementById('durazno-p2');
        const in1 = document.getElementById('promise-1');
        const in2 = document.getElementById('promise-2');

        const LEN = DURAZNO_BOARD.length;
        const BOARD_PX = 1800;         // tablero muy grande (la cámara hace zoom): casillas enormes y separadas
        const FOCUS_ZOOM = 0.95;       // acercamiento al seguir la ficha
        const PIPS = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
        let steps, turn, shields, promises, busy, finished, tokens, modal, dCard, coords;

        // 8 mazos finitos (uno por categoría) que se ven a la izquierda y bajan al sacar
        const DECK_CATS = ['reto', 'pregunta', 'penitencia', 'castigo', 'bonus', 'salvacion', 'escudo', 'promesa'];
        const decksEl = document.getElementById('durazno-decks');
        let deckPiles = {};

        function initDecks() {
            deckPiles = {};
            decksEl.innerHTML = '';
            DECK_CATS.forEach(cat => {
                deckPiles[cat] = shuffle(filterByIntensity(DURAZNO_CARDS[cat], 'text'));
                const meta = DURAZNO_META[cat];
                const d = document.createElement('div');
                d.className = 'd-deck cat-' + cat;
                d.dataset.cat = cat;
                d.innerHTML = `<span class="d-deck-name">${meta.label}</span><span class="d-deck-count">${deckPiles[cat].length}</span>`;
                decksEl.appendChild(d);
            });
        }
        function drawFrom(cat) {
            if (!deckPiles[cat] || !deckPiles[cat].length) deckPiles[cat] = shuffle(filterByIntensity(DURAZNO_CARDS[cat], 'text'));
            const card = deckPiles[cat].pop();
            const deckEl = decksEl.querySelector('.d-deck[data-cat="' + cat + '"]');
            if (deckEl) {
                deckEl.querySelector('.d-deck-count').textContent = deckPiles[cat].length;
                deckEl.classList.remove('drawing'); void deckEl.offsetWidth; deckEl.classList.add('drawing');
            }
            return card;
        }

        document.getElementById('promise-label-1').textContent = `Promesa de 🍆 ${P1()}`;
        document.getElementById('promise-label-2').textContent = `Promesa de 🍑 ${P2()}`;
        p1El.querySelector('.dp-name').textContent = '🍆 ' + P1();
        p2El.querySelector('.dp-name').textContent = '🍑 ' + P2();

        const name = (i) => i === 0 ? P1() : P2();
        // Resuelve el texto de la carta según el sexo del jugador en turno
        // (turno 0 = 🍆 hombre -> usa .m ; turno 1 = 🍑 mujer -> usa .f ; si no hay, usa .text)
        const sexText = (card) => {
            if (!card) return '';
            const k = turn === 0 ? 'm' : 'f';
            return card[k] || card.text || '';
        };

        // Genera puntos (%) sobre el contorno de un durazno (hendidura arriba, punta abajo)
        function peachCoords(n) {
            const pts = [];
            for (let i = 0; i < n; i++) {
                const a = (i / n) * Math.PI * 2;          // 0 = arriba, sentido horario
                const top = Math.max(0, Math.cos(a));     // 1 arriba
                const bot = Math.max(0, -Math.cos(a));    // 1 abajo
                const rx = 45 * (1 - 0.08 * bot * bot);   // ligera punta abajo
                const x = 50 + rx * Math.sin(a) * (1 - 0.10 * Math.pow(top, 4)); // leve hendidura arriba (separación pareja)
                const y = 48 - 45 * Math.cos(a) + 8 * Math.pow(top, 3);          // durazno suave
                pts.push({ x, y });
            }
            return pts;
        }

        const renderDie = (n) => {
            diceEl.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const s = document.createElement('span');
                s.className = 'pip' + (PIPS[n].includes(i) ? ' on' : '');
                diceEl.appendChild(s);
            }
        };

        function buildBoard() {
            coords = peachCoords(LEN);
            boardEl.style.width = BOARD_PX + 'px';
            boardEl.style.height = BOARD_PX + 'px';
            boardEl.innerHTML = '<div class="durazno-center-deco">🍑</div>';
            DURAZNO_BOARD.forEach((c, i) => {
                const meta = DURAZNO_META[c.cat];
                const cell = document.createElement('div');
                cell.className = 'd-cell d-' + c.cat;
                cell.style.left = coords[i].x + '%';
                cell.style.top = coords[i].y + '%';
                cell.innerHTML = `<span class="d-emoji">${meta.emoji}</span>`;
                cell.title = meta.label;
                boardEl.appendChild(cell);
            });
            // Fichas: berenjena y durazno (siempre por encima de las casillas)
            tokens = [0, 1].map(i => {
                const t = document.createElement('div');
                t.className = 'd-token d-token-' + i;
                t.textContent = i === 0 ? '🍆' : '🍑';
                boardEl.appendChild(t);
                return t;
            });
            placeToken(0); placeToken(1);
            fitBoard();
        }

        function placeToken(i) {
            const idx = ((steps[i] % LEN) + LEN) % LEN;
            tokens[i].style.left = coords[idx].x + '%';
            tokens[i].style.top = coords[idx].y + '%';
            tokens[i].classList.toggle('shielded', shields[i]);
        }

        // --- Cámara: encuadra todo el tablero o sigue a la ficha activa con zoom ---
        function setCam(tx, ty, zoom) {
            boardEl.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
        }
        function fitBoard() {
            const vw = viewport.clientWidth, vh = viewport.clientHeight;
            const zoom = Math.min(vw / BOARD_PX, vh / BOARD_PX) * 0.96;
            setCam((vw - BOARD_PX * zoom) / 2, (vh - BOARD_PX * zoom) / 2, zoom);
        }
        function focusToken(i, zoom) {
            const idx = ((steps[i] % LEN) + LEN) % LEN;
            const vw = viewport.clientWidth, vh = viewport.clientHeight;
            setCam(vw / 2 - (coords[idx].x / 100) * BOARD_PX * zoom,
                   vh / 2 - (coords[idx].y / 100) * BOARD_PX * zoom, zoom);
        }
        function updateHud() {
            p1El.querySelector('.dp-pos').textContent = `${Math.min(steps[0], LEN)}/${LEN}`;
            p2El.querySelector('.dp-pos').textContent = `${Math.min(steps[1], LEN)}/${LEN}`;
            p1El.classList.toggle('active', turn === 0 && !finished);
            p2El.classList.toggle('active', turn === 1 && !finished);
            turnEl.innerHTML = finished ? '¡Carrera terminada!' : `Turno de <strong>${name(turn)}</strong>`;
        }

        function start() {
            steps = [0, 0]; turn = 0; shields = [false, false]; busy = false; finished = false;
            promises = [
                in1.value.trim() || 'cumplir lo que decida su pareja',
                in2.value.trim() || 'cumplir lo que decida su pareja'
            ];
            setup.style.display = 'none';
            scene.style.display = 'block';
            initDecks();
            buildBoard();
            updateHud();
        }

        function animateDice(d, cb) {
            diceEl.classList.add('rolling');
            let ticks = 0;
            const iv = setInterval(() => {
                renderDie(1 + Math.floor(Math.random() * 6));
                if (++ticks > 10) {
                    clearInterval(iv);
                    diceEl.classList.remove('rolling');
                    renderDie(d);
                    cb();
                }
            }, 70);
        }

        // Carta "sacada de la mesa": diseño propio por categoría + animación
        function showModal(cat, text, onClose) {
            const meta = DURAZNO_META[cat] || { label: '', emoji: '' };
            dCard.className = 'd-card cat-' + cat;
            dCard.innerHTML =
                `<div class="d-card-head"><span class="d-cat">${meta.label}</span></div>` +
                `<p class="d-text">${text}</p>` +
                `<button class="spin-btn d-continue" type="button">CONTINUAR</button>`;
            dCard.style.animation = 'none'; void dCard.offsetWidth; dCard.style.animation = '';
            modal.style.display = 'flex';
            dCard.querySelector('.d-continue').onclick = () => { modal.style.display = 'none'; onClose(); };
        }

        function finish(winner) {
            finished = true; busy = true; updateHud();
            const loser = winner === 0 ? 1 : 0;
            const wEmoji = winner === 0 ? '🍆' : '🍑';
            const lEmoji = loser === 0 ? '🍆' : '🍑';
            const promesa = (promises[loser] && promises[loser].trim())
                ? `“${promises[loser]}”`
                : '(no escribió su promesa al inicio)';
            showModal('resultado',
                `🏆 ¡${wEmoji} ${name(winner)} dio la vuelta completa y GANÓ la carrera!\n\n` +
                `${lEmoji} ${name(loser)} pierde y debe cumplir lo que prometió:\n\n${promesa}`,
                () => {
                    setup.style.display = 'block';
                    scene.style.display = 'none';
                });
        }

        function endTurn() {
            turn = turn === 0 ? 1 : 0;   // el turno SIEMPRE pasa al otro jugador
            updateHud();
            fitBoard();      // entre turnos se ve todo el tablero
            busy = false;
        }

        // Mueve la ficha del turno casilla por casilla (la cámara la sigue con zoom)
        function hopBy(n, done) {
            const dir = n > 0 ? 1 : -1;
            let left = Math.abs(n);
            const step = () => {
                if (left <= 0) { updateHud(); return done(); }
                steps[turn] = Math.max(0, steps[turn] + dir);
                placeToken(turn); updateHud();
                focusToken(turn, FOCUS_ZOOM);
                left--;
                setTimeout(step, 280);
            };
            step();
        }

        function applyAndAdvance(cat, card) {
            let msg = card ? sexText(card) : '';
            let delta = 0;
            if (cat === 'bonus') delta = card.move || 0;
            else if (cat === 'castigo') {
                if (shields[turn]) { shields[turn] = false; msg += '\n\n🛡️ ¡Tu escudo te salvó del retroceso!'; }
                else delta = card.move || 0;
            } else if (card && card.shield) shields[turn] = true;

            showModal(cat, msg, () => {
                const after = () => {
                    if (steps[turn] >= LEN) return finish(turn);
                    endTurn();
                };
                if (delta !== 0) hopBy(delta, after); else after();   // los bonus/castigos también se mueven casilla por casilla
            });
        }

        function drawCardFor(cat) {
            if (cat === 'salida') {
                showModal('salida', '¡Casilla de salida! Respira hondo y sigue la carrera.', endTurn);
                return;
            }
            applyAndAdvance(cat, drawFrom(cat));
        }

        function roll() {
            if (busy || finished) return;
            busy = true;
            const d = 1 + Math.floor(Math.random() * 6);   // dado de 6
            animateDice(d, () => {
                // Secuencia: 1) se ve el resultado, 2) la ficha avanza casilla por casilla, 3) sale la carta
                setTimeout(() => {
                    hopBy(d, () => {
                        if (steps[turn] >= LEN) return finish(turn);
                        drawCardFor(DURAZNO_BOARD[steps[turn] % LEN].cat);
                    });
                }, 600);
            });
        }

        // Modal de carta: una sola vez y FUERA del tablero, para que no se mueva con la cámara
        modal = document.createElement('div');
        modal.className = 'd-modal';
        modal.style.display = 'none';
        modal.innerHTML = '<div class="d-card"></div>';
        stageEl.appendChild(modal);
        dCard = modal.querySelector('.d-card');

        renderDie(1);
        rollBtn.addEventListener('click', roll);
        in1.value = ''; in2.value = '';
        startBtn.addEventListener('click', start);
    }

    // Initial load
    renderView('home');
    if (!loadPlayers()) openSetup();   // primera vez: pedir nombres
});
