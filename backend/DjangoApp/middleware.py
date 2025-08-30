from django.http import HttpResponseForbidden

class FrontendOnlyMiddleware:
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        allowed_origins = [
            'https://d4i.akhilkumar.dev',
            'http://localhost:3000',
            'http://127.0.0.1:3000',
        ]
        
        origin = request.META.get('HTTP_ORIGIN')
        referer = request.META.get('HTTP_REFERER', '')
        user_agent = request.META.get('HTTP_USER_AGENT', '').lower()
        
        if 'postman' in user_agent or 'insomnia' in user_agent or 'curl' in user_agent:
            return HttpResponseForbidden('Access denied: API tools not allowed')
        
        if origin:
            if origin not in allowed_origins:
                return HttpResponseForbidden('Access denied: Invalid origin')
        elif referer:
            if not any(referer.startswith(allowed) for allowed in allowed_origins):
                return HttpResponseForbidden('Access denied: Invalid referer')
        else:
            return HttpResponseForbidden('Access denied: Missing origin or referer')
        
        response = self.get_response(request)
        return response