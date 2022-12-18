from django.shortcuts import render
#from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Note
from api.serializers import NoteSerializer

# Create your views here.

@api_view(['GET']) #formats response to look like a swagger page
def get_routes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    #return JsonResponse({"data": routes})
    return Response({"data": routes})

@api_view(['GET'])
def get_notes(request, primary_key=None):
    if not primary_key:
        notes = Note.objects.all()
        notes_data = NoteSerializer(notes, many=True).data
    else:
        notes = Note.objects.get(id=primary_key)
        notes_data = NoteSerializer(notes).data
    return Response(notes_data)

@api_view(['POST'])
def create_note(request):
    return Response()
