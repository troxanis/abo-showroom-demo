import { useEffect, useRef, useState } from "react";
import { Viewer, events } from "@photo-sphere-viewer/core";
import { GalleryPlugin } from "@photo-sphere-viewer/gallery-plugin";
import { type MarkerConfig, MarkersPlugin, events as markerEvents } from "@photo-sphere-viewer/markers-plugin";
import { XIcon } from "lucide-react";

const POINTER_SVG = `
<svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon style="fill:#FEE187;" points="167.546,473.728 174.833,112.185 449.789,347.061 283.379,354.048 "></polygon> <g> <path style="fill:#FFC61B;" d="M459.05,336.218L184.096,101.342c-4.19-3.579-10.07-4.425-15.1-2.167 c-5.029,2.257-8.308,7.211-8.419,12.722L153.29,473.44c-0.118,5.861,3.362,11.198,8.774,13.451 c1.774,0.739,3.633,1.097,5.479,1.097c3.789,0,7.509-1.512,10.25-4.344l77.772-80.355l45.008,100.287 c2.374,5.289,7.573,8.425,13.018,8.425c1.951,0,3.934-0.404,5.829-1.253l57.07-25.612c3.451-1.549,6.144-4.405,7.489-7.938 c1.345-3.535,1.231-7.459-0.318-10.909L354.674,401.7c-3.226-7.185-11.662-10.397-18.848-7.171 c-7.185,3.226-10.397,11.663-7.171,18.848l23.149,51.58l-31.052,13.935l-43.831-97.666l12.744-13.167l160.72-6.748 c5.856-0.245,10.967-4.051,12.881-9.592C465.18,346.174,463.508,340.026,459.05,336.218z M292.434,339.395L247.185,238.57 c-3.226-7.187-11.662-10.394-18.848-7.171c-7.185,3.226-10.397,11.663-7.171,18.848l45.25,100.826l-83.88,86.665l5.949-295.14 l224.453,191.737L292.434,339.395z"></path> <path style="fill:#FFC61B;" d="M151.711,73.797c-5.451,0-10.655-3.143-13.025-8.439l-18.968-42.397 c-3.217-7.19,0.004-15.624,7.193-18.84c7.19-3.217,15.623,0.004,18.84,7.193l18.968,42.396c3.217,7.19-0.004,15.624-7.193,18.84 C155.635,73.394,153.656,73.797,151.711,73.797z"></path> <path style="fill:#FFC61B;" d="M105.605,122.549c-1.691,0-3.409-0.302-5.084-0.943l-43.391-16.565 c-7.358-2.809-11.044-11.051-8.235-18.408c2.809-7.357,11.05-11.046,18.408-8.235l43.391,16.565 c7.358,2.809,11.044,11.051,8.235,18.408C116.759,119.054,111.346,122.549,105.605,122.549z"></path> <path style="fill:#FFC61B;" d="M267.528,118.012c-5.451,0-10.655-3.143-13.025-8.439c-3.217-7.188,0.003-15.624,7.193-18.84 l42.394-18.968c7.188-3.218,15.623,0.004,18.84,7.193c3.217,7.188-0.003,15.624-7.193,18.84l-42.394,18.968 C271.453,117.612,269.475,118.012,267.528,118.012z"></path> <path style="fill:#FFC61B;" d="M65.099,208.582c-5.451,0-10.655-3.141-13.025-8.439c-3.217-7.19,0.003-15.624,7.193-18.84 l42.394-18.968c7.188-3.217,15.624,0.004,18.84,7.193c3.217,7.19-0.003,15.624-7.193,18.84l-42.394,18.968 C69.023,208.181,67.046,208.582,65.099,208.582z"></path> <path style="fill:#FFC61B;" d="M218.766,71.919c-1.691,0-3.41-0.302-5.084-0.943c-7.358-2.809-11.044-11.051-8.235-18.408 l16.565-43.391c2.811-7.357,11.05-11.046,18.408-8.235c7.358,2.809,11.044,11.051,8.235,18.408L232.09,62.741 C229.92,68.424,224.508,71.919,218.766,71.919z"></path> </g> </g></svg>
`

type DialogProps = {
  open: boolean;
  onClose: () => void;
};

const Dialog = ({ open, onClose }: DialogProps) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="absolute w-screen h-screen bg-black/70 z-20 flex items-center justify-center"
    >
      <div
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
        }}
        className="max-w-7xl max-h-[80vh] w-full p-8 bg-white shadow rounded-xl relative"
      >
        <button className="absolute top-4 right-4" onClick={onClose} type='button'>
          <XIcon />
        </button>
        <div className="space-y-2">
          <article className="flex items-center gap-4">
            <div className="w-1/2">
              <img src='images/tv.jpg' alt="A TV" className="rounded shadow" />
            </div>
            <div className="w-1/2 space-y-4 leading-loose">
              <h1 className="text-4xl">A TV</h1>
              <p>
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
                ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
                Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
                voluptate dolor minim nulla est proident. Nostrud officia pariatur
                ut officia. Sit irure elit esse ea nulla sunt ex occaecat
                reprehenderit commodo officia dolor Lorem duis laboris cupidatat
                officia voluptate. Culpa proident adipisicing id nulla nisi laboris
                ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo
                ex non excepteur duis sunt velit enim. Voluptate laboris sint
                cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
              </p>
              <p>
                Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
                ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
                Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
                voluptate dolor minim nulla est proident. Nostrud officia pariatur
                ut officia. Sit irure elit esse ea nulla sunt ex occaecat
                reprehenderit commodo officia dolor Lorem duis laboris cupidatat
                officia voluptate. Culpa proident adipisicing id nulla nisi laboris
                ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo
                ex non excepteur duis sunt velit enim. Voluptate laboris sint
                cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

// https://vr.style3d.com/t/ed7f0166edabb7ef?share_state_id=9591&l=en-us

const PANORAMAS = Object.freeze({
  pan1: 'images/pan1.jpg',
  pan2: 'images/pan2.jpg',
  demo: 'images/equirectangular.jpg'
});

const MARKERS: Record<string, MarkerConfig[]> = {
  'images/pan1.jpg': [
    {
      id: 'door',
      circle: 30,
      position: { textureX: 364, textureY: 191 },
      hoverScale: 1.2,
      className: 'cursor-pointer'
    },
    {
      id: 'tv',
      // position: { yaw: 0, pitch: 0 },
      position: { textureX: 900, textureY: 225 },
      html: POINTER_SVG,
      // html: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cursor-pointer fill-white animate-bounce"><path d="M22 14a8 8 0 0 1-8 8"/><path d="M18 11v-1a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1"/><path d="M10 9.5V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
      anchor: 'bottom right',
      className: 'cursor-pointer animate-bounce'
    },
  ]
}

export default function RoomViewer() {
  const [open, setIsOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement | null>(null);
  const viewer = useRef<Viewer | null>(null);
  const markersPlugin = useRef<MarkersPlugin | null>(null);
  const [currentPanorama, setCurrentPanorama] = useState('images/pan1.jpg');

  useEffect(() => {
    const setMarkers = () => {
      if (!markersPlugin.current) return;

      const newMarkers: MarkerConfig[] | undefined = MARKERS[currentPanorama];
      markersPlugin.current.clearMarkers();

      setTimeout(() => {
        if (newMarkers && markersPlugin.current) {
          markersPlugin.current.setMarkers(newMarkers);
        }
      }, 100)
    }


    setMarkers();
  }, [currentPanorama]);


  useEffect(() => {
    if (!viewer.current) return;
    viewer.current.setPanorama(currentPanorama);
  }, [currentPanorama]);

  useEffect(() => {
    if (!wrapper.current) return;

    viewer.current  = new Viewer({
      defaultZoomLvl: 0,
      navbar: [],
      container: wrapper.current,
      panorama: currentPanorama,
      plugins: [
        [GalleryPlugin, {
          visibleOnLoad: true,
          hideOnClick: false,
          items: [
              {
                id: 'pano-1',
                name: 'Demo 1',
                panorama: PANORAMAS.pan1,
                thumbnail: PANORAMAS.pan1,
              },
              {
                id: 'pano-2',
                name: 'Demo 2',
                panorama: PANORAMAS.pan2,
                thumbnail: PANORAMAS.pan2,
              },
              {
                id: 'pano-3',
                name: 'Real 360',
                panorama: PANORAMAS.demo,
                thumbnail: PANORAMAS.demo,
              },
          ],
        }],
        [MarkersPlugin, {
          markers: MARKERS[PANORAMAS.pan1]
        }]
      ],
    });

    markersPlugin.current = viewer.current.getPlugin<MarkersPlugin>(MarkersPlugin);

    viewer.current.addEventListener('panorama-loaded', (event) => {
      const newPanorama = event.data.panorama;
      viewer.current?.needsUpdate()
      setCurrentPanorama(newPanorama as string)
    })

    const handleClick  = (e: events.ClickEvent) => {
      console.log({ textureX: e.data.textureX, textureY: e.data. textureY, data: e.data })
    }

    const handleMarkerClick = (e: markerEvents.SelectMarkerEvent) => {
      const marker = e.marker;
      switch (marker.id) {
        case 'door':
          setCurrentPanorama(PANORAMAS.pan2)
          break;
        case 'tv':
          setIsOpen(true);
          break;
        default:
          break;
      }
    }

    viewer.current.addEventListener('click', handleClick);
    markersPlugin.current.addEventListener('select-marker', handleMarkerClick);

    return () => {
      viewer!.current!.removeEventListener('click', handleClick);
      markersPlugin!.current!.removeEventListener('select-marker', handleMarkerClick);
    }
  }, []);



  return (
    <>
      {/* <svg */}
      {/*   xmlns="http://www.w3.org/2000/svg" */}
      {/*   width="24" */}
      {/*   height="24" */}
      {/*   fill="none" */}
      {/*   stroke="currentColor" */}
      {/*   strokeLinecap="round" */}
      {/*   strokeLinejoin="round" */}
      {/*   strokeWidth="2" */}
      {/*   id='pointer' */}
      {/*   className="lucide lucide-pointer" */}
      {/*   viewBox="0 0 24 24" */}
      {/* > */}
      {/*   <path d="M22 14a8 8 0 01-8 8M18 11v-1a2 2 0 00-2-2v0a2 2 0 00-2 2v0M14 10V9a2 2 0 00-2-2v0a2 2 0 00-2 2v1M10 9.5V4a2 2 0 00-2-2v0a2 2 0 00-2 2v10"></path> */}
      {/*   <path d="M18 11a2 2 0 114 0v3a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15"></path> */}
      {/* </svg>  */}
      <Dialog open={open} onClose={() => setIsOpen(false)} />
      <div
        ref={wrapper}
        className="w-screen h-screen"
        // onClick={() => setIsOpen(true)}
      />
    </>
  );
}
