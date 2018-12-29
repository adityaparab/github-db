import { inject, injectable } from 'inversify';
import { Next, Request, Response, Server } from 'restify';
import { Router } from 'restify-router';
import uniqid from 'uniqid';
import { TYPES } from '../../models';
import { DatabaseService } from '../../services/Database.service';

@injectable()
export class GHDBServerRouter {
    private router: Router = new Router();
    constructor(
        @inject(TYPES.DatabaseService) private databaseService: DatabaseService
    ) { }

    public configure(serverInstance: Server): void {
        this.router.get('/:collectionName', this.GetRequestHandler.bind(this));
        this.router.post('/:collectionName', this.PostRequestHandler.bind(this));
        this.router.put('/:collectionName/:id', this.PutRequestHandler.bind(this));
        this.router.del('/:collectionName/:id', this.DeleteRequestHandler.bind(this));

        this.router.applyRoutes(serverInstance, '/api');
    }

    private GetRequestHandler(req: Request, res: Response, next: Next): void {
        const database = this.databaseService.getDatabase();
        const currentCollection = database[req.params.collectionName];

        if (currentCollection) {
            res.json(currentCollection);
        } else {
            res.status(404);
            res.json({ message: `Collection: ${req.params.collectionName} not found` });
        }
    }

    private PostRequestHandler(req: Request, res: Response, next: Next): void {
        const { collectionName } = req.params;
        const database = this.databaseService.getDatabase();
        let currentCollection = database[collectionName];
        const body = { ...req.body, id: uniqid() };
        if (currentCollection && Array.isArray(currentCollection)) {

            currentCollection.push(body);
        } else {
            database[collectionName] = [body];
            currentCollection = database[collectionName];
        }
        this.databaseService.updateDatabase(database)
            .then(() => {
                res.status(200);
                res.json(currentCollection);
            });
    }

    private PutRequestHandler(req: Request, res: Response, next: Next): void {
        const { collectionName } = req.params;
        const database = this.databaseService.getDatabase();
        const currentCollection = database[collectionName];

        const { id } = req.params;
        if (currentCollection && Array.isArray(currentCollection) && id) {
            const updatedCollection = currentCollection.map((c: any) => {
                return c.id === id ? { ...req.body, id: c.id } : c;
            });

            database[collectionName] = updatedCollection;
            this.databaseService.updateDatabase(database)
                .then(() => res.json(updatedCollection))
                .catch((error: any) => {
                    res.status(500);
                    res.json(error);
                });
        } else {
            res.status(404);
            res.json({ message: `Collection with id: ${id} not found` });
        }
    }

    private DeleteRequestHandler(req: Request, res: Response, next: Next): void {
        const { collectionName, id } = req.params;
        const database = this.databaseService.getDatabase();
        const currentCollection = database[collectionName];

        if (currentCollection && Array.isArray(currentCollection)) {
            if (id) {
                const updatedCollection = currentCollection.filter((c: any) => c.id !== id);
                database[collectionName] = updatedCollection;
                this.databaseService.updateDatabase(database)
                    .then(() => res.json(updatedCollection))
                    .catch((error: any) => {
                        res.status(500);
                        res.json(error);
                    });
            } else {
                res.status(404);
                res.json({ message: `Collection with id: ${id} not found` });
            }
        } else {
            res.status(404);
            res.json({ message: `Collection: ${collectionName} not found` });
        }
    }
}
